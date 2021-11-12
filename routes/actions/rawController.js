// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Raw      = require('../../models/Raw');
const Assay    = require('../../models/Assay');
const Identity = require('../../models/Identity');
const Method   = require('../../models/Method');
const Unit     = require('../../models/Unit');
const Texture  = require('../../models/Texture');

const rawPopPaths = [
  'texture',
  'assays.units',
  'assays.assay',
  'assays.method',
  'ids.identity',
  'ids.method',
];

// GET: api/raws/ | Get a list of all raw specifications | Private
const getRaws = trycatch( async (req, res) => {
  const raws = await Raw.find().populate(rawPopPaths).exec();
  if (raws) res.status(200).json(raws);
  else { res.status(404); throw new Error("Unable to find raw materials.") };
});

// POST: api/raws/ | Create a new raw material | Private
const createRaw = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newRaw = new Raw(entries);
  const savedRaw = await newRaw.save();
  if (savedRaw) {
    await savedRaw.populate(rawPopPaths).execPopulate();
    res.status(201).json(savedRaw);
  }
  else { res.status(401); throw new Error("Failed to save the new raw item"); };
});

// POST: api/raws/raw_id | Edit the raw with the given ID | Private
const editRaw = trycatch( async (req, res) => {
  const current = await Raw.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedRaw = await current.save();
    if (savedRaw) {
      await savedRaw.populate(rawPopPaths).execPopulate();
      res.status(201).json(savedRaw);
    }
    else { res.status(401); throw new Error("Unable to edit the selected raw."); };
  }
  else { res.status(401); throw new Error("Could not locate selected raw item."); };
});

// DELETE: api/raws/ | Remove the raw with the given ID from the database | Private
const removeRaw = trycatch( async (req, res) => {
  const raw = await Raw.findById(req.params.id);
  if (raw) raw.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) })
  else { res.status(404); throw new Error("Could not find the raw item to delete."); };
});

// Return an array of objects with the assay references and specs from the given info
const makeAssays = assays => {
  return Promise.all(assays.map(assay => {
    return new Promise(async (resolve, reject) => {
      // Format the assay entries to have proper data-types
      let formatted = {
        min: Number(assay.min),
        max: Number(assay.max),
      };

      // Check for a new assay
      if (assay.newName) {
        const assayCheck = await Assay.findOne({ name: assay.newName.toLowerCase() });
        if (!assayCheck) {
          const newAssay = new Assay({name: assay.newName.toLowerCase()});
          const savedAssay = await newAssay.save();
          if (savedAssay) formatted.assay = savedAssay._id;
          else reject("Unable to save new assay.");
        } else formatted.assay = assayCheck._id;
      }
      else {
        if (assay.assayId) {
          const currentAssay = await Assay.findById(assay.assayId);
          if (currentAssay) formatted.assay = currentAssay._id;
          else reject("Unable to locate selected assay.");
        } else reject("No assay selected.");
      }

      // Check for a new method
      if (assay.newMethod) {
        const methCheck = await Method.findOne({ name: assay.newMethod });
        if (!methCheck) {
          const newMethod = new Method({name: assay.newMethod});
          const savedMethod = await newMethod.save();
          if (savedMethod) formatted.method = savedMethod._id;
          else reject("Unable to save new method.");
        } else formatted.method = methCheck._id;
      }
      else {
        if (assay.methodId) {
          const currentMethod = await Method.findById(assay.methodId);
          if (currentMethod) formatted.method = currentMethod._id;
          else reject("Unable to locate selected method.");
        } else reject("No assay method selected.");
      }

      // Check for new units
      if (assay.newUnit) {
        const unitCheck = await Unit.findOne({ name: assay.newUnit });
        if (!unitCheck) {
          const newUnit = new Unit({name: assay.newUnit});
          const savedUnit = await newUnit.save();
          if (savedUnit) formatted.units = savedUnit._id;
          else reject("Unable to save new unit.");
        } else formatted.units = unitCheck._id;
      }
      else {
        if (assay.unitId) {
          const currentUnit = await Unit.findById(assay.unitId);
          if (currentUnit) formatted.units = currentUnit._id;
          else reject("Unable to locate selected unit");
        } else reject("No assay unit selected.");
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
      // Format the id entries to have proper data-types
      let formatted = { posneg: id.posneg };

      // Check for a new identity
      if (id.newName) {
        const idCheck = await Identity.findOne({ name: id.newName.toLowerCase() });
        if (!idCheck) {
          const newId = new Identity({
            name:         id.newName.toLowerCase(),
            is_botanical: id.is_botanical,
            genus:        id.genus.toLowerCase(),
            species:      id.species.toLowerCase(),
            part:         id.part.toLowerCase(),
            solvent:      id.solvent.toLowerCase(),
            ratio:        id.ratio
          });
          const savedId = await newId.save();
          if (savedId) formatted.identity = savedId._id;
          else reject("Unable to save new identity.");
        } else formatted.identity = idCheck._id;
      }
      else {
        if (id.identityId) {
          const currentIdentity = await Identity.findById(id.identityId);
          if (currentIdentity) formatted.identity = currentIdentity._id;
          else reject("Unable to locate selected identity.");
        } else reject("No identity selected.");
      }

      // Check for a new method
      if (id.newMethod) {
        const methCheck = await Method.findOne({ name: id.newMethod });
        if (!methCheck) {
          const newMethod = new Method({name: id.newMethod});
          const savedMethod = await newMethod.save();
          if (savedMethod) formatted.method = savedMethod._id;
          else reject("Unable to save new method.");
        } else formatted.method = methCheck._id;
      }
      else {
        if (id.methodId) {
          const currentMethod = await Method.findById(id.methodId);
          if (currentMethod) formatted.method = currentMethod._id;
          else reject("Unable to locate selected method.");
        } else reject("No identity method selected.");
      }

      // Return one of the completed identities and go to the next Promise
      resolve(formatted);
    });
  }));
};

// Return an id from the texture collection in the database
const makeTexture = (id, newName) => {
  return new Promise(async (resolve, reject) => {
    if (newName) {
      const texCheck = await Texture.findOne({ name: newName.toLowerCase() });
      if (!texCheck) {
        const newTexture = new Texture({name: newName.toLowerCase()});
        const savedTexture = await newTexture.save();
        if (savedTexture) resolve(savedTexture._id);
        else reject("Unable to save new texture.");
      } else resolve(texCheck._id);
    }
    else {
      if (id) {
        const currentTexture = await Texture.findById(id);
        if (currentTexture) resolve(currentTexture._id);
        else reject("Unable to locate selected texture.");
      } else reject("No texture selected.");
    }
  });
}

// Validate entries and convert them to the required format
const formatEntries = async body => {
  return {
    number:  Number(body.number),
    name:    body.name.toLowerCase(),
    color:   body.color.toLowerCase(),
    odor:    body.odor.toLowerCase(),
    taste:   body.taste.toLowerCase(),
    texture: await makeTexture(body.textureId, body.newTexture),
    hm: {
      arsenic:   Number(body.arsenic),
      cadmium:   Number(body.cadmium),
      lead:      Number(body.lead),
      mercury:   Number(body.mercury),
      nickel:    Number(body.nickel),
      nickel_tested:    body.nickel_tested,
      units:            body.hm_units,
    },
    moisture: {
      min: Number(body.moisture_min),
      max: Number(body.moisture_max)
    },
    density: {
      min: Number(body.density_min),
      max: Number(body.density_max)
    },
    micro: {
      tpc: Number(body.tpc),
      tpc_units: body.tpc_units,
      ym: Number(body.ym),
      ym_units: body.ym_units,
      entero: Number(body.entero),
      entero_units: body.entero_units,
      salmonella: body.salmonella,
      staph: body.staph,
      ecoli: body.ecoli,
      paeru: body.paeru,
      paeru_tested: body.paeru_tested
    },
    pesticide: {
      tested: body.pesticide_tested,
      standard: body.pesticide_standard
    },
    solvent: {
      tested: body.solvent_tested,
      standard: body.solvent_standard
    },
    rancidity: {
      tested: body.rancidity_tested,
      peroxide: Number(body.peroxide),
      anisidine: Number(body.anisidine),
      totox: Number(body.totox)
    },
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
    assays: await makeAssays(body.assays), // Array
    ids:    await makeIds(body.ids)        // Array
  }
}

module.exports = {getRaws, createRaw, editRaw, removeRaw};
