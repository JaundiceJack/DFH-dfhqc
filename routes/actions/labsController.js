// Import Libraries
const trycatch = require('express-async-handler');
// Import models
const Lab = require('../../models/Lab');
const Assay = require('../../models/Assay');
const Identity = require('../../models/Identity');
const Method = require('../../models/Method');

const labPopPaths = ['capabilities.assay', 'capabilities.identity', 'capabilities.method']

// GET: api/labs/ | Get a list of all labs | Private
const getLabs = trycatch( async (req, res) => {
  const labs = await Lab.find().populate(labPopPaths).exec();
  if (labs) res.status(201).json(labs);
  else { res.status(404); throw new Error("Labs not found."); };
});

// GET: api/labs/id | Get the selected lab | Private
const getLab = trycatch( async (req, res) => {
  const lab = await Lab.findById(req.params.id).populate(labPopPaths).exec();
  if (lab) res.status(201).json(lab);
  else { res.status(404); throw new Error("Lab not found."); };
});

// POST: api/labs/ Create a new lab with the given info | Private
const createLab = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const existing = await Lab.findOne({ name: entries.name });
  if (!existing) {
    const newLab = new Lab(entries);
    const lab = await newLab.save();
    if (lab) {
      await lab.populate(labPopPaths).execPopulate();
      res.status(201).json(lab);
    }
    else { res.status(401); throw new Error("Failed to save new lab."); };
  }
  else { res.status(401); throw new Error("This lab already exists."); };
});

// If any assays or identities were removed from the lab's capabilities,
// Remove the lab from the assay/id's lab options
const updateAssayCapabilities = (labId, current, entries) => {
  const currentAssays = current.map(cap => cap.assay);
  const entryAssays = entries.map(cap => cap.assay);
  const removedAssays = currentAssays.map(cap => entryAssays.indexOf(cap === -1));
  console.log("Current Assays:", currentAssays);
  console.log("Entry Assays:", entryAssays);
  console.log("Removed Assays:", removedAssays);
  // Loop over the removed assays and remove the lab from each one's lab options
  removedAssays.forEach(async (id, i) => {
    if (id) {
      const assay = await Assay.findById(id);
      if (assay) {
        assay.labs = assay.labs.filter(lab => lab !== labId);
        await assay.save();
      }
    }
  });
}
const updateIdentityCapabilities = (labId, current, entries) => {
  const currentIds = current.map(cap => cap.identity);
  const entryIds = entries.map(cap => cap.identity);
  const removedIds = currentIds.map(cap => entryIds.indexOf(cap === -1));
  // Loop over the removed ids and remove the lab from each one's lab options
  removedIds.forEach(async (id, i) => {
    if (id) {
      const identity = await Identity.findById(id);
      if (identity) {
        identity.labs = identity.labs.filter(lab => lab !== labId);
        await identity.save();
      }
    }
  });
}


// PUT api/labs/lab_id | Edit the lab with the given ID | Private
const editLab = trycatch( async (req, res) => {
  const current = await Lab.findById(req.params.id);

  if (current) {
    // If any assays or identities were removed from the lab's capabilities,
    // Remove the lab from the assay/id's lab options
    updateAssayCapabilities(req.params.id, current.capabilities, req.body.capabilities);
    updateIdentityCapabilities(req.params.id, current.capabilities, req.body.capabilities);

    const entries = await formatEntries(req.body, req.params.id);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) {
      await savedEdits.populate(labPopPaths).execPopulate();
      res.status(201).json(savedEdits);
    }
    else { res.status(401); throw new Error("Unable to edit the selected lab."); };
  }
  else { res.status(401); throw new Error("Could not locate selected lab."); };
});


// TODO: Remove the lab from all assay/id lab options as well
// DELETE: api/labs/ | Remove the lab with the given ID from the database | Private
const removeLab = trycatch( async (req, res) => {
  const lab = await Lab.findById(req.params.id);
  if (lab) lab.remove().then(() => res.json(req.params.id)).catch(e => { return new Error(e) });
  else { res.status(404); throw new Error("Unable to locate the lab to delete."); };
});


// When capabilities are updated, add or remove the lab from the relevant assay/id documents
const storeLabAssay = (labId, assayId) => {
  return new Promise(async (resolve, reject) => {
    if (assayId) {
      const assay = await Assay.findById(assayId);
      if (assay) {
        if (!assay.labs) assay.labs = [labId]
        else if (assay.labs && assay.labs.indexOf(labId) === -1) assay.labs.push(labId);
        await assay.save();
        resolve(assay._id);
      }
      else { console.log(`Assay with ID ${assayId} not found.`); resolve(null); }
    }
  })
}
const storeLabIdentity = (labId, identityId) => {
  return new Promise(async (resolve, reject) => {
    if (identityId) {
      const identity = await Identity.findById(identityId);
      if (identity) {
        if (!identity.labs) identity.labs = [labId]
        else if (identity.labs.indexOf(labId) === -1) identity.labs.push(labId);
        await identity.save();
        resolve(identity._id);
      }
      else { console.log(`Identity with ID ${identityId} not found.`); resolve(null); }
    }
  })
}
const handleCapabilities = (labId, caps) => {
  return Promise.all(caps.map(cap => {
    return new Promise(async (resolve, reject) => {
      let formatted = {
        assay: null,
        identity: null,
        method: cap.method,
        tat: Number(cap.tat),
        price: Number(cap.price)
      }
      // Add the lab to the assay or identity's lab options
      if (cap.assay) formatted.assay = await storeLabAssay(labId, cap.assay);
      if (cap.identity) formatted.identity = await storeLabIdentity(labId, cap.identity);
      resolve(formatted);
    })
  }))
}

// Validate entries and convert them to the required format
const formatEntries = async (body, labId=null) => {
  return {
    name: body.name ? body.name.toLowerCase() : null,
    shipping: {
      address: (body.shipping && body.shipping.address) ? body.shipping.address.toLowerCase() : null,
      city:    (body.shipping && body.shipping.city)    ? body.shipping.city.toLowerCase() : null,
      zip:     (body.shipping && body.shipping.zip)     ? body.shipping.zip : null,
      state:   (body.shipping && body.shipping.state)   ? body.shipping.state.toLowerCase() : null
    },
    billing: {
      address: (body.billing && body.billing.address) ? body.billing.address.toLowerCase() : null,
      city:    (body.billing && body.billing.city)    ? body.billing.city.toLowerCase() : null,
      zip:     (body.billing && body.billing.zip)     ? body.billing.zip : null,
      state:   (body.billing && body.billing.state)   ? body.billing.state.toLowerCase() : null
    },
    contact: {
      emails: (body.contact && body.contact.emails) ?
        body.contact.emails.map(email => email.toLowerCase()) : null,
      phones: (body.contact && body.contact.phones) ?
        body.contact.phones.map(phone => phone.toLowerCase()) : null
    },
    capabilities: await handleCapabilities(labId, body.capabilities)
  };
};

module.exports = {getLabs, getLab, createLab, editLab, removeLab};
