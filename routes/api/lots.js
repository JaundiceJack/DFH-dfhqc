// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
// Import route access protection
const auth = require('../../middleware/auth');
// Import schemas and make models
const Unit     = mongoose.connection.model('units',     require('../../schemas/Unit'));
const Raw      = mongoose.connection.model('raws',      require('../../schemas/Raw'));
const RawLot   = mongoose.connection.model('rawlots',   require('../../schemas/RawLot'));
const Blend    = mongoose.connection.model('blends',    require('../../schemas/Blend'));
const BlendLot = mongoose.connection.model('blendlots', require('../../schemas/BlendLot'));
const Bulk     = mongoose.connection.model('bulks',     require('../../schemas/Bulk'));
const BulkLot  = mongoose.connection.model('bulklots',  require('../../schemas/BulkLot'));
const FinishedGood = mongoose.connection.model('finishedgoods', require('../../schemas/FinishedGood'));
const FinishedGoodLot = mongoose.connection.model('finishedgoodlots', require('../../schemas/FinishedGoodLot'));

// GET: api/lots/ | Get lists of each type of lot | Private
router.get('/', trycatch(async (req, res) => {
  const raws   = await RawLot.find().populate('item');
  const blends = await BlendLot.find().populate('item');
  const bulks  = await BulkLot.find().populate('item');
  const fgs    = await FinishedGoodLot.find().populate('item')
  const others = [];
  res.json({ raws, blends, bulks, fgs, others });
}));

// Select the type of lot to create
const makeLot = (lotType, entries) => {
  switch (lotType) {
    case 'raw':
      return new RawLot(entries)
    case 'blend':
      return new BlendLot(entries)
    case 'bulk':
      return new BulkLot(entries)
    case 'fg':
      return new FinishedGoodLot(entries)
    case 'other':
    default:
      return null
  }
}

// POST: api/lots | Create a new lot | Private
router.post('/', trycatch(async (req, res) => {
  console.log("Saving new lot...");
  const entries = await formatEntries(req.body.itemType, req.body);
  const newLot = makeLot(req.body.itemType, entries);
  newLot.save().then(async lot => {
    if (lot) {
      await lot.populate('item').execPopulate();
      console.log("Lot successfully saved!");
      res.json(lot);
    } else res.status(401).json({ error: "Failed to save new lot."});
  }).catch(e => res.status(401).json({ error: "Failed to save new lot." }));
}));




const makePesticideSample = (date) => {
  return {
    result: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null
  }
}
const makeHMSample = (date) => {
  return {
    arsenic: null,
    cadmium: null,
    lead: null,
    mercury: null,
    nickel: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null
  }
}
const makeSolventSample = (date) => {
  return {
    result: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null,
  }
}
const makeRanciditySample = (date) => {
  return {
    peroxide: null,
    p_anisidine: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null,
  }
}
const makeMicroSample = (date) => {
  return {
    tpc: null,
    ym: null,
    entero: null,
    salmonella: null,
    ecoli: null,
    staph: null,
    paeru: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null,
  }
}


// POST: api/lots/take_raw_sample | Set/Create a result object | Private
router.post('/take_raw_sample', trycatch( async (req, res) => {

  // TODO: I should pass in an index with the request body, so that certain ones can be edited

  // find the raw sample
  const lot = await RawLot.findById(req.body.lotId).populate('item');
  if (lot) {
    if (req.body.resultType === 'pesticide')
      lot.pesticide_results.push(makePesticideSample(req.body.date));
    else if (req.body.resultType === 'solvent')
      lot.solvent_results.push(makeSolventSample(req.body.date));
    else if (req.body.resultType === 'rancidity')
      lot.rancidity_results.push(makeRanciditySample(req.body.date));
    else if (req.body.resultType === 'heavy metal')
      lot.hm_results.push(makeHMSample(req.body.date));
    else if (req.body.resultType === 'micro')
      lot.micro_results.push(makeMicroSample(req.body.date));
    lot.save()
    .then(lot => res.json(lot))
    .catch(err => res.status(400).json({error: "Unable to edit the selected lot."}));
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the raw material to sample.");
  }
}));

router.post('/remove_raw_sample', trycatch( async (req, res) => {
  // find the raw sample and populate item for the return value
  const lot = await RawLot.findById(req.body.lotId).populate('item');
  if (lot) {
    if (req.body.resultType === 'pesticide')
      lot.pesticide_results.pop();
    else if (req.body.resultType === 'solvent')
      lot.solvent_results.pop();
    else if (req.body.resultType === 'rancidity')
      lot.rancidity_results.pop();
    else if (req.body.resultType === 'heavy metal')
      lot.hm_results.pop();
    else if (req.body.resultType === 'micro')
      lot.micro_results.pop();
    lot.save()
    .then(lot => res.json(lot))
    .catch(err => res.status(400).json({error: "Unable to edit the selected lot."}));
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the requested lot.");
  }
}))

router.post('/test_raw_sample', trycatch( async (req, res) => {

  // TODO: I should pass in an index with the request body, so that certain ones can be edited

  // find the raw sample
  const lot = await RawLot.findById(req.body.lotId).populate('item');
  // find the lab the sample was sent to
  const lab = await Lab.findById(req.body.labId);


}));

// POST: api/lots/lot_id | Edit the lot with the given ID | Private
router.post('/:id', trycatch(async (req, res) => {
  console.log("Editing selected lot...");
  // Get the lot by it's id
  const current = await Lot.findOne({ _id: req.params.id });
  if (current) {
    // Format the new entries
    const entries = await formatEntries(req.body);
    // Set the current lot's new properties
    current.item = entries.item;
    current.purchase_order = entries.purchase_order;
    // Save the modified lot
    current.save()
    .then(lot => res.json(lot))
    .catch(err => res.status(400).json({error: "Unable to edit the selected lot."}));
  }
  else res.status(401).json({error: "Could not locate selected lot item."});
}));

// DELETE: api/lots/raw/id | Remove the lot with the given ID | Private
router.delete('/raw/:id', (req, res) => {
  RawLot
  .findById(req.params.id)
  .then(lot => lot.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});
router.delete('/blend/:id', (req, res) => {
  BlendLot
  .findById(req.params.id)
  .then(lot => lot.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});
router.delete('/bulk/:id', (req, res) => {
  BulkLot
  .findById(req.params.id)
  .then(lot => lot.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});
router.delete('/fg/:id', (req, res) => {
  FinishedGoodLot
  .findById(req.params.id)
  .then(lot => lot.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});
router.delete('/other/:id', (req, res) => {
  return;
});



// Validate entries and convert them to the required format
const formatEntries = async (lotType, body) => {
  switch (lotType) {
    case 'raw':
      return await formatRawEntries(body)
    case 'blend':
      return await formatBlendEntries(body)
    case 'bulk':
      return await formatBulkEntries(body)
    case 'fg':
      return await formatFgEntries(body)
    case 'other':
    default:
      return null
  }
}

const formatRawEntries = async body => {
  return {
    lot: body.lot,
    item: body.rawItemId,
    facility_location: body.facilityLocation,
    warehouse_location: body.warehouseLocation,
    purchase_order: Number(body.purchaseOrder),
    amount: body.amount,
    amount_units: body.amountUnits,
    manufacturer_id: body.manufacturerId,
    vendor_id: body.vendorId,
    maker_lot: body.makerLot,
  }
}
const formatBlendEntries = async body => {
  return {
    lot: body.lot,
    item: body.blendItemId,
    facility_location: body.facilityLocation,
    warehouse_location: body.warehouseLocation,
    purchase_order: Number(body.purchaseOrder),
    amount: body.amount,
    amount_units: body.amountUnits,
  }
}
const formatBulkEntries = async body => {
  return {
    lot: body.lot,
    item: body.bulkItemId,
    facility_location: body.facilityLocation,
    warehouse_location: body.warehouseLocation,
    purchase_order: Number(body.purchaseOrder),
    amount: body.amount,
    amount_units: body.amountUnits,
  }
}
const formatFgEntries = async body => {
  return {
    lot: body.lot,
    item: body.fgItemId,
    facility_location: body.facilityLocation,
    warehouse_location: body.warehouseLocation,
    purchase_order: Number(body.purchaseOrder),
    amount: body.amount,
    amount_units: body.amountUnits
  }
}
const formatOtherEntries = async body => {
  return {
    lot: body.lot
  }
}


module.exports = router;
