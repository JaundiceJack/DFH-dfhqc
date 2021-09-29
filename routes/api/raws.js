// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const connection = require('../../mongo');
// Import route access protection
//const auth = require('../../middleware/auth');
// Import schemas and make models
const Raw         = connection.model('raw',         require('../../schemas/Raw'));
const Assay       = connection.model('assay',       require('../../schemas/Assay'));
const Identity    = connection.model('id',          require('../../schemas/Identity'));
const AssayMethod = connection.model('assayMethod', require('../../schemas/AssayMethod'));
const IdMethod    = connection.model('idMethod',    require('../../schemas/IdMethod'));
const Unit        = connection.model('unit',        require('../../schemas/Unit'));

// GET -> api/raws/
// Get a list of all raw specification
router.get('/',  (req, res) => {
  Raw.find()
  .then( raws => {
    res.json(raws.sort((a, b) => { return a.number < b.number ? -1 : a.number > b.number ? 1 : 0 }));
  });
});

// GET -> api/raws/options
// Get a list of the assay & id names, methods, and units
router.get('/options', async (req, res) => {
  const a = await Assay.find();
  const i = await Identity.find();
  const am = await AssayMethod.find();
  const im = await IdMethod.find();
  const u = await Unit.find();
  const assayNames = a.map(assay => {return assay.name}).sort();
  const idNames = i.map(id => {return id.name}).sort();
  const assayMethods = am.map(method => {return method.name});
  const idMethods = im.map(method => {return method.name});
  const units = u.map(unit => {return unit.name});
  res.json({assayNames, idNames, assayMethods, idMethods, units});
})


// POST -> api/raws/
// Create a new raw material with the given specifications
router.post('/', async (req, res) => {
  console.log("Saving new raw...");
  // Validate entries
  const entries = await formatEntries(req.body);
  // Create a new raw
  const newRaw = new Raw(entries);
  newRaw.save()
  .then(raw => {
    console.log("New Raw:", raw);
    if (raw) res.status(201).json(newRaw);
    else res.status(401).json({error: "Failed to save new raw."});
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({error: "Failed to save new raw"});
  });
});

// POST -> api/raws/raw_id
// Edit the raw with the given ID
router.post('/:id', async (req, res) => {
  console.log("Editing selected raw...");
  // Get the raw by it's id
  const current = await Raw.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current raw's new properties
    current.name = entries.name;
    current.color = entries.color
    current.odor = entries.odor
    current.taste = entries.taste
    current.texture = entries.texture
    current.arsenic_max = entries.arsenic_max
    current.cadmium_max = entries.cadmium_max
    current.lead_max = entries.lead_max
    current.mercury_max = entries.mercury_max
    current.nickel_max = entries.nickel_max
    current.nickel_tested = entries.nickel_tested
    current.hm_units = entries.hm_units
    current.moisture_max = entries.moisture_max
    current.moisture_min = entries.moisture_min
    current.density_max = entries.density_max
    current.density_min = entries.density_min
    current.tpc_max = entries.tpc_max
    current.tpc_units = entries.tpc_units
    current.ym_max = entries.ym_max
    current.ym_units = entries.ym_units
    current.entero_max = entries.entero_max
    current.entero_units = entries.entero_units
    current.salmonella = entries.salmonella
    current.staph = entries.staph
    current.ecoli = entries.ecoli
    current.paeru = entries.paeru
    current.paeru_tested = entries.paeru_tested
    current.pesticide_tested = entries.pesticide_tested
    current.pesticide_standard = entries.pesticide_standard
    current.solvent_tested = entries.solvent_tested
    current.solvent_standard = entries.solvent_standard
    current.rancidity_tested = entries.rancidity_tested
    current.peroxide_max = entries.peroxide_max
    current.p_anisidine_max = entries.p_anisidine_max
    current.allergens = entries.allergens
    current.totox_max = entries.totox_max
    current.assays = entries.assays
    current.ids = entries.ids
    // Save the modified raw
    current.save()
    .then(raw => res.json(raw))
    .catch(err => res.status(400).json({error: "Unable to edit the selected raw."}));
  }
  else res.status(401).json({error: "Could not locate selected raw item."});
});

// DELETE -> api/raws/
// Remove the raw with the given ID from the database
router.delete('/:id', (req, res) => {
  Raw
  .findById(req.params.id)
  .then(raw => raw.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
})



// Return an array of objects with the assay references and specs from the given info
const makeAssays = assays => {
  return Promise.all(assays.map(assay => {
    return new Promise(async (resolve, reject) => {
      // Get the existing name, method, and unit references if they exist
      const assayName = assay.name === "New Assay" ? assay.newName : assay.name;
      const methodName = assay.method === "New Method" ? assay.newMethod : assay.method;
      const unitName = assay.units === "New Units" ? assay.newUnits : assay.units;
      const current = await Assay.findOne({ name: assayName });
      const method = await AssayMethod.findOne({ name: methodName });
      const unit = await Unit.findOne({ name: unitName })
      // Format the assay entries to have proper data-types
      let formatted = {
        assay_name: assayName.toLowerCase(),
        assay_min: Number(assay.min),
        assay_max: Number(assay.max),
        assay_units: unitName,
        assay_method: methodName
      };
      // If found, assign the current object that assay's id
      if (current) { formatted.assay_id = current._id; }
      // Otherwise, save the new assay name and give the item's assay the new ID
      else {
        const newAssay = new Assay({ name: assayName.toLowerCase() });
        const saved = newAssay.save().catch(err => reject(err));
        formatted.assay_id = saved._id;
      };
      // Save the units and/or method if they were new
      if (!method) {
        const newMethod = new AssayMethod({ name: methodName });
        newMethod.save().catch(err => reject(err));
      }
      if(!unit) {
        const newUnit = new Unit({ name: unitName });
        newUnit.save().catch(err => reject(err));
      }
      // Return one of the completed assays and go to the next Promise
      resolve(formatted);
    });
  }));
};


// Return an array of objects with the id references and specs from the given info
const makeIds = ids => {
  return Promise.all(ids.map(id => {
    return new Promise(async (resolve, reject) => {
      // Check the new id for an existing entry in the Identity database
      const idName = id.name === "New Id" ? id.newName : id.name;
      const methodName = id.method === "New Method" ? id.newMethod : id.method;
      const current = await Identity.findOne({ name: idName });
      const method = await IdMethod.findOne({ name: methodName });

      let formatted = {
        identity_name:         idName.toLowerCase(),
        identity_posneg:       id.posneg,
        identity_is_botanical: id.isBotanical,
        identity_method:       methodName,
        identity_genus:        id.genus.toLowerCase(),
        identity_species:      id.species.toLowerCase(),
        identity_part:         id.part.toLowerCase(),
        identity_solvent:      id.solvent.toLowerCase(),
        identity_ratio:        id.ratio
      };
      // If there's an existing entry, set the id to it, otherwise make a new one
      if (current) { formatted.identity_id = current._id; }
      else {
        const newId = new Identity({ name: idName.toLowerCase() });
        const saved = newId.save().catch(err => reject(err));
        formatted.identity_id = saved._id;
      };
      // Save the method if it was new
      if (!method) {
        const newMethod = new IdMethod({ name: methodName });
        newMethod.save().catch(err => reject(err));
      }
      resolve(formatted);
    });
  }));
};

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    number:        Number(body.number),   // Number
    name:          body.name.toLowerCase(),     // String
    color:         body.color.toLowerCase(),    // String
    odor:          body.odor.toLowerCase(),     // String
    taste:         body.taste.toLowerCase(),    // String
    texture:       body.texture,  // Selected String
    arsenic_max:   Number(body.arsenicMax),  // Number
    cadmium_max:   Number(body.cadmiumMax),  // Number
    lead_max:      Number(body.leadMax),     // Number
    mercury_max:   Number(body.mercuryMax),  // Number
    nickel_max:    Number(body.nickelMax),   // Number
    nickel_tested: body.nickelTested,  // Boolean
    hm_units:      body.hmUnits, // Selected String
    moisture_max:  Number(body.moistureMax), // Number
    moisture_min:  Number(body.moistureMin), // Number
    density_max:   Number(body.densityMax),  // Number
    density_min:   Number(body.densityMin),  // Number
    tpc_max:       Number(body.tpcMax),  // Number
    tpc_units:     body.tpcUnits,  // Selected String
    ym_max:        Number(body.ymMax), // Number
    ym_units:      body.ymUnits, // Selected String
    entero_max:    Number(body.enteroMax), // Number
    entero_units:  body.enteroUnits, // Selected String
    salmonella:    body.salmonella, // Selected String
    staph:         body.staph,  // Selected String
    ecoli:         body.ecoli,  // Selected String
    paeru:         body.paeru,  // Selected String
    paeru_tested:  body.paeruTested, // Boolean
    pesticide_tested: body.pesticideTested,  // Boolean
    pesticide_standard: body.pesticideStandard,  // Selected String
    solvent_tested:   body.solventTested, // Boolean
    solvent_standard: body.solventStandard, // Selected String
    rancidity_tested: body.rancidityTested, // Boolean
    peroxide_max:     Number(body.peroxideMax), // Number
    p_anisidine_max:  Number(body.pAnisidineMax), // Number
    allergens: {
      soy: body.soy,
      egg: body.egg,
      milk: body.milk,
      fish: body.fish,
      wheat: body.wheat,
      peanut: body.peanut,
      tree_nut: body.treeNut,
      shellfish: body.shellfish
    },
    totox_max: body.totoxMax, // Number
    assays: await makeAssays(body.assays), // Array
    ids:    await makeIds(body.ids)        // Array
  }
}

module.exports = router;
