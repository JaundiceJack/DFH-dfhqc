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
router.get('/', trycatch( async (req, res) => {
  const raws   = await RawLot.find()
    .populate([
      { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
      'receiving.manufacturer',
      'receiving.vendor'
    ]).exec();
  const blends = await BlendLot.find().populate('item').exec();
  const bulks  = await BulkLot.find().populate('item').exec();
  const fgs    = await FinishedGoodLot.find().populate('item').exec();
  const others = [];
  res.json({ raws, blends, bulks, fgs, others });
}));

// Select the type of lot to create
const makeLot = (lotType, entries) => {
  switch (lotType) {
    case 'raw':   return new RawLot(entries);
    case 'blend': return new BlendLot(entries);
    case 'bulk':  return new BulkLot(entries);
    case 'fg':    return new FinishedGoodLot(entries);
    case 'other':
    default:      return null
  }
}

// POST: api/lots | Create a new lot | Private
router.post('/', trycatch( async (req, res) => {
  const entries = await formatEntries(req.body.item_type, req.body);
  const newLot = makeLot(req.body.item_type, entries);
  const savedLot = await newLot.save();
  if (savedLot) {
    req.body.item_type === 'raw' ?
      await savedLot.populate([
        { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
        'receiving.manufacturer',
        'receiving.vendor'
      ]).execPopulate() :
      await savedLot.populate('item').execPopulate();
    res.status(201).json(savedLot);
  } else { res.status(401); throw new Error("Unable to save new lot."); }
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
    anisidine: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null,
  }
}
const makeMicroSample = (sample) => {
  return {
    tpc: null,
    ym: null,
    entero: null,
    salmonella: null,
    ecoli: null,
    staph: null,
    paeru: null,
    sent_to: null,
    sent_date: null,
    result_date: null,
    sample_date: new Date(sample.sample_date + 'T00:00:00'),
    amount: sample.amount,
    units: sample.units,
  }
}
const makeAssaySample = (date, id) => {
  return {
    assay: id,
    result: null,
    sent_to: null,
    sample_date: new Date(date + 'T00:00:00'),
    sent_date: null,
    result_date: null,
  }
}

// TODO: I should pass in an index with the request body, so that certain ones can be edited
// POST: api/lots/take_raw_sample | Set/Create a result object | Private
router.post('/take_raw_sample', trycatch( async (req, res) => {
  const lot = await RawLot.findById(req.body.lotId).populate('item').exec();
  if (lot) {
    if (req.body.resultType === 'pesticide')
      lot.testing.pesticide.push(makePesticideSample(req.body.date));
    else if (req.body.resultType === 'solvent')
      lot.testing.solvent.push(makeSolventSample(req.body.date));
    else if (req.body.resultType === 'rancidity')
      lot.testing.rancidity.push(makeRanciditySample(req.body.date));
    else if (req.body.resultType === 'heavy metal')
      lot.testing.hm.push(makeHMSample(req.body.date));
    else if (req.body.resultType === 'micro')
      lot.testing.micro.push(makeMicroSample(req.body.sample));
    else if (req.body.resultType === 'assay')
      lot.testing.assay.push(makeAssaySample(req.body.date, req.body.testId))

    const savedLot = await lot.save();
    await savedLot.populate([
      { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
      'receiving.manufacturer',
      'receiving.vendor'
    ]).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the raw material to sample.");
  }
}));

router.delete('/remove_raw_sample', trycatch( async (req, res) => {
  // find the raw sample and populate item for the return value
  const lot = await RawLot.findById(req.body.lotId).populate('item').exec();
  if (lot) {
    if (req.body.resultType === 'pesticide')
      lot.testing.pesticide.pop();
    else if (req.body.resultType === 'solvent')
      lot.testing.solvent.pop();
    else if (req.body.resultType === 'rancidity')
      lot.testing.rancidity.pop();
    else if (req.body.resultType === 'heavy metal')
      lot.testing.hm.pop();
    else if (req.body.resultType === 'micro')
      lot.testing.micro = lot.testing.micro.filter(micro => micro.sample_date !== req.body.sample.sample_date);
    else if (req.body.resultType === 'assay')
      lot.testing.assay = lot.testing.assay.filter((a) => a.assay === req.body.testId)
    const savedLot = await lot.save();
    await savedLot.populate([
      { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
      'receiving.manufacturer',
      'receiving.vendor'
    ]).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
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
  let current;
  switch (req.body.item_type) {
    case 'raw':   current = await RawLot.findById(req.params.id); break;
    case 'blend': current = await BlendLot.findById(req.params.id); break;
    case 'bulk':  current = await BulkLot.findById(req.params.id); break;
    case 'fg':    current = await FinishedGoodLot.findById(req.params.id); break;
    default: throw new Error("Lot type not selected.");
  }
  if (current) {
    const entries = await formatEntries(req.body.item_type, req.body);
    Object.assign(current, entries);
    const savedLot = await current.save();
    if (savedLot) {
      req.body.item_type === 'raw' ?
        await savedLot.populate([
          { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
          'receiving.manufacturer',
          'receiving.vendor'
        ]).execPopulate() :
        await savedLot.populate('item').execPopulate();
      res.status(201).json(savedLot);
    } else { res.status(401); throw new Error("Unable to edit the selected lot."); };
  } else { res.status(401); throw new Error("Could not locate selected lot."); };
}));

router.delete('/sample/:type/:id/:date', trycatch( async (req, res) => {
  // find the raw sample and populate item for the return value
  const lot = await RawLot.findById(req.params.id).populate('item').exec();
  if (lot) {
    if (req.params.type === 'pesticide')
      lot.testing.pesticide.pop();
    else if (req.params.type === 'solvent')
      lot.testing.solvent.pop();
    else if (req.params.type === 'rancidity')
      lot.testing.rancidity.pop();
    else if (req.params.type === 'heavy metal')
      lot.testing.hm.pop();
    else if (req.params.type === 'micro')
      lot.testing.micro = lot.testing.micro.filter(micro => micro.sample_date !== req.params.date);
    else if (req.params.type === 'assay')
      lot.testing.assay = lot.testing.assay.filter((a) => a.assay === req.body.testId)
    const savedLot = await lot.save();
    await savedLot.populate([
      { path: 'item', populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] },
      'receiving.manufacturer',
      'receiving.vendor'
    ]).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the requested lot.");
  }
}))

// DELETE: api/lots/type/id | Remove the lot with the given ID | Private
router.delete('/:type/:id', trycatch( async (req, res) => {
  let item;
  switch (req.params.type) {
    case 'raw':   item = await RawLot.findById(req.params.id); break;
    case 'blend': item = await BlendLot.findById(req.params.id); break;
    case 'bulk':  item = await BulkLot.findById(req.params.id); break;
    case 'fg':    item = await FinishedGoodLot.findById(req.params.id); break;
    case 'other': throw new Error("Other lot types not yet implemented."); break;
    default:      throw new Error("Lot type not chosen.")
  }
  if (item) item.remove().then(() => res.json({success: true})).catch(e => { return new Error(e) })
  else { res.status(404); throw new Error("Could not find the item to delete."); };
}));

// Validate entries and convert them to the required format
const formatEntries = async (lotType, body) => {
  switch (lotType) {
    case 'raw':   return await formatRawEntries(body);
    case 'blend': return await formatBlendEntries(body);
    case 'bulk':  return await formatBulkEntries(body);
    case 'fg':    return await formatFgEntries(body);
    case 'other':
    default:      return null
  }
}
const formatRawEntries = async body => {
  return {
    lot:  body.lot,
    item: body.rawId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
      status: body.status
    },
    receiving: {
      facility:         body.facility,
      location:         body.location,
      purchase_order:   Number(body.purchase_order),
      manufacturer:     body.manufacturerId,
      manufacturer_lot: body.manufacturer_lot,
      vendor:           body.vendorId,
    }
  }
}
const formatBlendEntries = async body => {
  return {
    lot:  body.lot,
    item: body.blendId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
    },
    receiving: {
      facility: body.facility,
      location: body.location,
    }
  }
}
const formatBulkEntries = async body => {
  return {
    lot:  body.lot,
    item: body.blendId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
    },
    receiving: {
      facility: body.facility,
      location: body.location,
    }
  }
}
const formatFgEntries = async body => {
  return {
    lot:  body.lot,
    item: body.blendId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
    },
    receiving: {
      facility: body.facility,
      location: body.location,
    }
  }
}
const formatOtherEntries = async body => {
  return {
    lot: body.lot
  }
}

module.exports = router;
