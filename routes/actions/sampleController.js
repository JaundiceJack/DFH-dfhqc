// Import libraries
const trycatch = require('express-async-handler');

// Import models
const RawSample = require('../models/RawSample.js');

const getRawSamples = trycatch( async (req, res) => {
  const samples = RawSample.find({ lot: req.params.lot_id });
  if (samples) res.status(200).json(samples)
  else { res.status(404); throw new Error("Could not find raw samples.") }
});

const createRawSample = trycatch( async (req, res) => {

});

const formatNewRawSample = sample => {
  sample_type: sample.sample_type,
  lot:         sample.lotId,
  assay:       sample.assayId,
  identity:    sample.identityId,
  samples: [{
    lab: sample.labId,
    number: sample.number,
    amount: sample.amount,
    units:  sample.units,
    results: [  ],
    date_sampled:   sample.date_sampled,
    date_sent:      sample.date_sent,
    date_of_result: sample.date_of_result
  }]
}

module.exports = { getRawSamples, createRawSample, editRawSample, removeRawSample };
