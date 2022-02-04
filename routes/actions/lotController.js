// Import libraries
const trycatch = require('express-async-handler');
// Create models
const Unit     = require('../../models/Unit');
const Raw      = require('../../models/Raw');
const Blend    = require('../../models/Blend');
const Bulk     = require('../../models/Bulk');
const FinishedGood = require('../../models/FinishedGood');
const Lot      = require('../../models/Lot');
const Test     = require('../../models/Test.js');

// I thought i was being clever to simply give the entire array back on edit/removing
// but it looks like it makes implemting the selection on the front-end more diffucult
//

// ok, now the add new, and edit return the modified lot,
// whereas the delete and get all return the entire list


// General paths to populate for each lot query
const popPaths = [
  'receiving.manufacturer',
  'receiving.vendor',
  'prior_lot',
  { path: 'raw', populate: [
    'assays.method', 'assays.assay', 'assays.units',
    'ids.identity', 'ids.method',
    { path: 'rancidity.passing_lots.lot', populate: 'tests' },
    { path: 'pesticide.passing_lots.lot', populate: 'tests' },
  ] },
  { path: 'blend',
    populate: [] },
  { path: 'bulk',
    populate: [] },
  { path: 'fg',
    populate: [] },
];

/**/
// GET: api/lots/ | return all raw, blend, bulk, & fg lots | Private
const getLots = trycatch( async (req, res) => {
  const lots = await Lot.find().populate(popPaths).exec();
  if (lots) res.status(200).json(lots);
  else { res.status(400); throw new Error("Unable to locate item lots.") }
});

/**/
// GET: api/lots/id | Search the lots for the given id | Private
const getLot = trycatch( async (req, res) => {
  const lot = await Lot.findById(req.params.id).populate(popPaths).exec();
  if (lot) res.status(200).json(lot);
  else { res.status(404); throw new Error(`Unable to locate requested lot. ID: ${req.params.id}`)}
})

/**/
// POST: api/lots/ | create a new lot from user entries | Private
const createLot = trycatch( async (req, res) => {
  // Format & validate the entries before assigning them to a new lot
  const entries = await formatEntries(req.body);
  const newLot = new Lot(entries);
  const savedLot = await newLot.save();
  if (savedLot) {
    // Assign the saved lot to the item's lots array
    const lotSavedToItem = await saveLotToItem(savedLot);
    if (lotSavedToItem) {
      await savedLot.populate(popPaths).execPopulate();
      res.status(200).json(savedLot);
    } else { res.status(400); throw new Error("Lot not saved to item."); }
  } else { res.status(401); throw new Error("Unable to save new lot."); }
});

// Save the lot to the relevant item's lots array
const saveLotToItem = async lot => {
  let item = null;
  switch (lot.type) {
    case 'raw': {
      let raw = await Raw.findById(lot.raw);
      if (raw) { raw.lots.push(lot._id); item = await raw.save(); }
    }
    case 'blend': {
      let blend = await Blend.findById(lot.blend);
      if (blend) { blend.lots.push(lot._id); item = await blend.save(); }
    }
    case 'bulk': {
      let bulk = await Bulk.findById(lot.bulk);
      if (bulk) { bulk.lots.push(lot._id); item = await bulk.save(); }
    }
    case 'fg': {
      let fg = await FinishedGood.findById(lot.fg);
      if (fg) { fg.lots.push(lot._id); item = await fg.save(); }
    }
  }
  return item;
}

/**/
// POST: api/lots/id | edit the lot with the given id | Private
const editLot = trycatch(async (req, res) => {
  const current = await Lot.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedLot = await current.save();
    if (savedLot) {
      await savedLot.populate(popPaths).execPopulate();
      res.status(200).json(savedLot);
    } else { res.status(401); throw new Error("Unable to edit the selected lot."); };
  } else { res.status(401); throw new Error("Could not locate selected lot."); };
});

/**/ // TODO: remove the lot's tests as well
// DELETE: api/lots/id | remove the lot with the given ID | Private
const removeLot = trycatch( async (req, res) => {
  const lot = await Lot.findById(req.params.id);
  if (lot) {
    // Remove all of the lot's tests
    lot.tests.forEach(async testId => {
      const test = await Test.findById(testId);
      if (test) await test.remove();
    })
    // Remove the lot itself
    const lotRemoved = await lot.remove();
    if (lotRemoved) {
      const lots = await Lot.find().populate(popPaths).exec();
      if (lots) { res.status(200).json(lots);
      } else { res.status(400); throw new Error("Unable to locate item lots.") }
    } else { res.status(400); throw new Error("Unable to remove selected lot.")}
  } else { res.status(404); throw new Error("Could not find the lot to delete."); }
});

/**/
// Convert/Validate the fields for a new/existing lot
const formatEntries = body => {
  return {
    lot:       body.lot,
    prior_lot: body.prior_lot,
    raw:   body.rawId,
    blend: body.blendId,
    bulk:  body.bulkId,
    fg:    body.fgId,
    type:  body.type,
    department: body.department,
    inventory: {
      amount: Number(body.amount),
      units:  body.units,
      status: body.status,
      expiration: body.expiration ? new Date(body.expiration + 'T00:00:00') : null
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

module.exports = { getLots, getLot, createLot, editLot, removeLot };
