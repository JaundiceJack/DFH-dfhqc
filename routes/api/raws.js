// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Raw         = mongoose.connection.model('raws',     require('../../schemas/Raw'));
const Assay       = mongoose.connection.model('assays',   require('../../schemas/Assay'));
const Identity    = mongoose.connection.model('ids',      require('../../schemas/Identity'));
const Method      = mongoose.connection.model('methods',  require('../../schemas/Method'));
const Unit        = mongoose.connection.model('units',    require('../../schemas/Unit'));
const Texture     = mongoose.connection.model('textures', require('../../schemas/Texture'));

// GET: api/raws/ | Get a list of all raw specifications | Private
router.get('/', trycatch( async (req, res) => {
  const raws = await Raw.find().populate('texture').exec();
  if (raws) res.status(201).json(raws);
  else { res.status(404); throw new Error("Unable to find raw materials.") };
}));

// POST: api/raws/ | Create a new raw material | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newRaw = new Raw(entries);
  const savedRaw = await newRaw.save();
  if (savedRaw) res.status(201).json(savedRaw);
  else { res.status(401); throw new Error("Failed to save the new raw item"); };
}));

// POST: api/raws/raw_id | Edit the raw with the given ID | Private
router.post('/:id', trycatch( async (req, res) => {
  const current = await Raw.findOne({ _id: req.params.id });
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedRaw = await current.save();
    if (savedRaw) res.status(201).json(savedRaw);
    else { res.status(401); throw new Error("Unable to edit the selected raw."); };
  }
  else { res.status(401); throw new Error("Could not locate selected raw item."); };
}));

// DELETE: api/raws/ | Remove the raw with the given ID from the database | Private
router.delete('/:id', trycatch( async (req, res) => {
  const raw = await Raw.findById(req.params.id);
  if (raw) raw.remove().then(() => res.json({success: true}));
  else { res.status(404); throw new Error("Could not find the raw item to delete."); };
}));


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
          if (savedUnit) formatted.unit = savedUnit._id;
          else reject("Unable to save new unit.");
        } else formatted.unit = unitCheck._id;
      }
      else {
        if (assay.unitId) {
          const currentUnit = await Unit.findById(assay.unitId);
          if (currentUnit) formatted.unit = currentUnit._id;
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
      // Format the assay entries to have proper data-types
      let formatted = { posneg: id.posneg };

      // Check for a new identity
      if (id.newName) {
        const idCheck = await Identity.findOne({ name: id.newName.toLowerCase() });
        if (!idCheck) {
          const newId = new Identity({
            name:         id.newName.toLowerCase(),
            is_botanical: id.isBotanical,
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
    number:        Number(body.number),   // Number
    name:          body.name.toLowerCase(),     // String
    color:         body.color.toLowerCase(),    // String
    odor:          body.odor.toLowerCase(),     // String
    taste:         body.taste.toLowerCase(),    // String
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
    allergens: {
      soy: body.soy,            // Boolean
      egg: body.egg,            // Boolean
      milk: body.milk,          // Boolean
      fish: body.fish,          // Boolean
      wheat: body.wheat,        // Boolean
      peanut: body.peanut,      // Boolean
      tree_nut: body.treeNut,   // Boolean
      shellfish: body.shellfish // Boolean
    },
    peroxide_max:     Number(body.peroxideMax), // Number
    p_anisidine_max:  Number(body.pAnisidineMax), // Number
    totox_max:        Number(body.totoxMax), // Number
    texture: await makeTexture(body.textureId, body.newTexture),
    assays: await makeAssays(body.assays), // Array
    ids:    await makeIds(body.ids)        // Array
  }
}

/*
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
*/

module.exports = router;
