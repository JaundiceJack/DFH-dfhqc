// Import libraries
const trycatch = require('express-async-handler');
// Create models
const Unit     = require('../../models/Unit');
const Raw      = require('../../models/Raw');
const RawLot   = require('../../models/RawLot');
const Blend    = require('../../models/Blend');
const BlendLot = require('../../models/BlendLot');
const Bulk     = require('../../models/Bulk');
const BulkLot  = require('../../models/BulkLot');
const FinishedGood = require('../../models/FinishedGood');
const FinishedGoodLot = require('../../models/FinishedGoodLot');

const rawPopPaths = [
  'receiving.manufacturer',
  'receiving.vendor',
  'testing.micro.sent_to',
  'testing.hm.sent_to',
  { path: 'item',
    populate: ['assays.method', 'assays.assay', 'assays.units', 'ids.identity', 'ids.method'] }
];

// TODO: Add error checking here
// GET: api/lots/ | return all raw, blend, bulk, & fg lots | Private
const getLots = trycatch( async (req, res) => {
  const raws = await RawLot.find().populate(rawPopPaths).exec();
  const blends = await BlendLot.find().populate('item').exec();
  const bulks  = await BulkLot.find().populate('item').exec();
  const fgs    = await FinishedGoodLot.find().populate('item').exec();
  const others = [];
  res.json({ raws, blends, bulks, fgs, others });
});

// POST: api/lots/ | create a new lot from user entries | Private
const createLot = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body.item_type, req.body);
  const newLot = makeLot(req.body.item_type, entries);
  const savedLot = await newLot.save();
  if (savedLot) {
    req.body.item_type === 'raw' ?
      await savedLot.populate(rawPopPaths).execPopulate() :
      await savedLot.populate('item').execPopulate();
    res.status(201).json(savedLot);
  } else { res.status(401); throw new Error("Unable to save new lot."); }
});

// POST: api/lots/id | edit the lot with the given id | Private
const editLot = trycatch(async (req, res) => {
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
        await savedLot.populate(rawPopPaths).execPopulate() :
        await savedLot.populate('item').execPopulate();
      res.status(201).json(savedLot);
    } else { res.status(401); throw new Error("Unable to edit the selected lot."); };
  } else { res.status(401); throw new Error("Could not locate selected lot."); };
});

// DELETE: api/lots/type/id | remove the lot with the given ID | Private
const removeLot = trycatch( async (req, res) => {
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
})

// POST: api/lots/sample_raw | add a new sample to the selected raw lot | Private
const createRawSample = trycatch( async (req, res) => {
  const lot = await RawLot.findById(req.body.lotId).populate('item').exec();
  if (lot) {
    selectSampleType(req.body.resultType, req.body.sample, lot.testing);
    const savedLot = await lot.save();
    await savedLot.populate(rawPopPaths).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the raw material to sample.");
  }
})

// POST: api/lots/test_raw | Add testing to the given sample | Private
const testRawSample = trycatch( async (req, res) => {
  const lot = await RawLot.findById(req.body.lotId).populate('item').exec();
  if (lot) {
    const sampleIndex = lot.testing[req.body.resultType].findIndex(element =>
        element.sample_number === Number(req.body.sample.sample_number) );
    if (sampleIndex !== -1) {
      Object.assign(
        lot.testing[req.body.resultType][sampleIndex],
        await formatRawTesting(req.body.resultType, req.body.sample)
      )
    }
    else { res.status(404); throw new Error("Lot's selected sample not found.") }
    const savedLot = await lot.save();
    await savedLot.populate(rawPopPaths).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
  } else { res.status(404); throw new Error("Unable to find lot to submit testing to.") }
})

// DELETE: api/lots/unsample_raw | remove the selected sample | Private
const removeRawSample = trycatch( async (req, res) => {
  // find the raw sample and populate item for the return value
  const lot = await RawLot.findById(req.params.id).populate('item').exec();
  if (lot) {
    if (req.params.sampleType === 'pesticide')
      lot.testing.pesticide = lot.testing.pesticide.filter(pest =>
        pest.sample_number !== Number(req.params.sampleNumber));
    else if (req.params.sampleType === 'solvent')
      lot.testing.solvent = lot.testing.solvent.filter(solv =>
        solv.sample_number !== Number(req.params.sampleNumber));
    else if (req.params.sampleType === 'rancidity')
      lot.testing.rancidity = lot.testing.rancidity.filter(ranc =>
        ranc.sample_number !== Number(req.params.sampleNumber));
    else if (req.params.sampleType === 'hm')
      lot.testing.hm = lot.testing.hm.filter(heav =>
        heav.sample_number !== Number(req.params.sampleNumber));
    else if (req.params.sampleType === 'micro')
      lot.testing.micro = lot.testing.micro.filter(micro =>
        micro.sample_number !== Number(req.params.sampleNumber));
    else if (req.params.sampleType === 'assay') {
      const assayIndex = lot.testing.assay.findIndex(a => a.assay === req.params.testId);
      if (assayIndex !== -1)
        lot.testing.assay[assayIndex].samples.filter(sample =>
          sample.sample_number !== Number(req.params.sampleNumber));
    }
    const savedLot = await lot.save();
    await savedLot.populate(rawPopPaths).execPopulate();
    if (savedLot) res.status(201).json(savedLot);
    else { res.status(400); throw new Error("Unable to edit the selected lot.") }
  }
  else {
    res.status(404);
    throw new Error("Server was unable to find the requested lot.");
  }
})

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

// Validate new/edited lot entries
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

// Validate testing results
const formatRawTesting = async (sampleType, body) => {
  switch (sampleType) {
    case 'micro': return await formatRawMicroTesting(body);
    case 'hm':    return await formatRawHmTesting(body);
    case 'assay': return await formatRawAssayTesting(body);
    default: return {};
  }
}
const formatRawMicroTesting = async body => {
  return {
    sent_to:   body.sent_to,
    sent_date: body.sent_date !== null && new Date(body.sent_date + 'T00:00:00'),
    tpc:    (body.tpc    !== null && body.tpc    !== "") ? Number(body.tpc)    : null,
    ym:     (body.ym     !== null && body.ym     !== "") ? Number(body.ym)     : null,
    entero: (body.entero !== null && body.entero !== "") ? Number(body.entero) : null,
    salmonella: (body.salmonella !== "") ? body.salmonella : null,
    ecoli:      (body.ecoli !== "") ? body.ecoli : null,
    staph:      (body.staph !== "") ? body.staph : null,
    paeru:      (body.paeru !== "") ? body.paeru : null,
  }
}
const formatRawHmTesting = async body => {
  return {
    sent_to:   body.sent_to,
    sent_date: body.sent_date !== null && new Date(body.sent_date + 'T00:00:00'),
    arsenic: (body.arsenic !== null && body.arsenic !== "") ? Number(body.arsenic) : null,
    cadmium: (body.cadmium !== null && body.cadmium !== "") ? Number(body.cadmium) : null,
    lead:    (body.lead    !== null && body.lead    !== "") ? Number(body.lead)    : null,
    mercury: (body.mercury !== null && body.mercury !== "") ? Number(body.mercury) : null,
    nickel:  (body.nickel  !== null && body.nickel  !== "") ? Number(body.nickel)  : null,
  }
}
const formatRawAssayTesting = async body => {

}

// Validate/create new testing samples
const selectSampleType = (resultType, sample, testing) => {
  switch (resultType) {
    case 'hm':    testing.hm.push(makeHMSample(sample, testing.hm)); break;
    case 'micro': testing.micro.push(makeMicroSample(sample, testing.micro)); break;
    case 'assay': makeAssaySample(sample, testing.assay); break;
  }
}

// I have to handle the assay one differently since the samples are sequestered within individual assays
// before pushing a new one, i need to check for the existence of the assay,
// if found, push the sample into the sample's samples
// otherwise make a new one

const makePesticideSample = (sample) => {
  return {
    result: null,
    sent_to: null,
    sample_date: new Date(sample.sample_date + 'T00:00:00'),
    amount: sample.amount,
    units: sample.units,
    sent_date: null,
    result_date: null
  }
}
const makeHMSample = (sample, hmSamples) => {
  return {
    sample_number: hmSamples.length > 0 ? hmSamples[hmSamples.length - 1].sample_number+1 : 1,
    arsenic: null,
    cadmium: null,
    lead: null,
    mercury: null,
    nickel: null,
    sent_to: null,
    sent_date: null,
    result_date: null,
    sample_date: new Date(sample.sample_date + 'T00:00:00'),
    amount: Number(sample.amount),
    units: sample.units,
  }
}
const makeSolventSample = (sample) => {
  return {
    result: null,
    sent_to: null,
    sample_date: new Date(sample.sample_date + 'T00:00:00'),
    amount: sample.amount,
    units: sample.units,
    sent_date: null,
    result_date: null,
  }
}
const makeRanciditySample = (date) => {
  return {
    peroxide: null,
    anisidine: null,
    sent_to: null,
    sample_date: new Date(sample.sample_date + 'T00:00:00'),
    amount: sample.amount,
    units: sample.units,
    sent_date: null,
    result_date: null,
  }
}
const makeMicroSample = (sample, microSamples) => {
  return {
    sample_number: microSamples.length > 0 ? microSamples[microSamples.length - 1].sample_number+1 : 1,
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
    amount: Number(sample.amount),
    units: sample.units,
  }
}
const makeAssaySample = (sample, assaySamples) => {
  // Check for an existing assay sample
  const existing = assaySamples.findIndex(a => a.assay == sample.assayId);
  if (existing !== -1) {
    assaySamples[existing].samples.push({
      sample_number: assaySamples[existing].samples.length > 0 ? assaySamples[existing].samples[assaySamples[existing].samples.length - 1].sample_number+1 : 1,
      amount: Number(sample.amount),
      units: sample.units,
      result: null,
      sent_to: null,
      sample_date: new Date(sample.sample_date + 'T00:00:00'),
      sent_date: null,
      result_date: null
    })
  }
  else {
    assaySamples.push({
      assay: sample.assayId,
      samples: [{
        sample_number: 1,
        amount: Number(sample.amount),
        units: sample.units,
        result: null,
        sent_to: null,
        sample_date: new Date(sample.sample_date + 'T00:00:00'),
        sent_date: null,
        result_date: null
      }]
    })
  }
}

module.exports = { getLots, createLot, editLot, removeLot,
  createRawSample, testRawSample, removeRawSample };
