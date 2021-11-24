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
const RawSample = require('../../models/RawTest.js');

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
  const raws   = await RawLot.find().populate(rawPopPaths).exec();
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
});


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
      purchase_order:   body.purchase_order ? Number(body.purchase_order) : null,
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
      status: body.status
    },
    receiving: {
      facility: body.facility,
      location: body.location,
      purchase_order:   body.purchase_order ? Number(body.purchase_order) : null,
      manufacturer:     body.manufacturerId,
      manufacturer_lot: body.manufacturer_lot,
      vendor:           body.vendorId,
    }
  }
}
const formatBulkEntries = async body => {
  return {
    lot:  body.lot,
    item: body.bulkId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
      status: body.status
    },
    receiving: {
      facility: body.facility,
      location: body.location,
      purchase_order:   body.purchase_order ? Number(body.purchase_order) : null,
      manufacturer:     body.manufacturerId,
      manufacturer_lot: body.manufacturer_lot,
      vendor:           body.vendorId,
    }
  }
}
const formatFgEntries = async body => {
  return {
    lot:  body.lot,
    item: body.fgId,
    department: body.department,
    inventory: {
      amount: body.amount,
      units:  body.units,
      status: body.status
    },
    receiving: {
      facility: body.facility,
      location: body.location,
      purchase_order:   body.purchase_order ? Number(body.purchase_order) : null,
      manufacturer:     body.manufacturerId,
      manufacturer_lot: body.manufacturer_lot,
      vendor:           body.vendorId,
    }
  }
}
const formatOtherEntries = async body => {
  return {
    lot: body.lot
  }
}



module.exports = { getLots, createLot, editLot, removeLot };
