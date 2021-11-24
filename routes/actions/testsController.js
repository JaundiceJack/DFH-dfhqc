// Import libraries
const trycatch = require('express-async-handler');

// Import models
const RawTest = require('../../models/RawTest.js');
const RawLot  = require('../../models/RawLot');

const testPopPaths = [
  'samples.lab'
]

// GET: api/samples/lotId | Get a list of the given lot's tests | Private
const getRawTests = trycatch( async (req, res) => {
  const tests = await RawTest.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
  if (tests) res.status(200).json(tests)
  else { res.status(404); throw new Error("Could not find raw tests."); };
});

// POST: api/samples/lotId | Create a new testing sample for the given lot | Private
const createRawTest = trycatch( async (req, res) => {
  // Locate the lot to create a sample for
  const lot = await RawLot.findById(req.params.lotId);
  if (lot) {
    // Find any existing test for the lot
    const existingTest = await RawTest.findOne({ lot: req.params.lotId, type: req.body.sampleType });
    // Create a new test TODO: for assays and IDs, supply their _id here
    let savedTest = null;
    if (!existingTest) {
      const entries = formatNewRawTest(req.body.sampleType, req.params.lotId, null, null);
      entries.samples.push(formatNewRawSample(0, req.body.sample));
      const newTest = new RawTest(entries);
      savedTest = await newTest.save();
    }
    // Push the new sample into the existing test
    else {
      const nextSampleNumber = existingTest.samples.length > 0 ?
        existingTest.samples[existingTest.samples.length-1].number + 1 : 0;
      existingTest.samples.push(formatNewRawSample(nextSampleNumber, req.body.sample));
      savedTest = await existingTest.save();
    }
    // Respond with the updated samples
    if (savedTest) {
      await savedTest.populate(testPopPaths).execPopulate();
      const tests = await RawTest.find({ lot: req.params.lotId });
      if (tests) { res.status(200).json(tests)
      } else { res.status(404); throw new Error("Could not find raw tests."); };
    } else { res.status(401); throw new Error("Unable to create a new sample."); }
  } else { res.status(404); throw new Error("Could not find the lot to add a sample to."); };
});

const editRawTest = trycatch( async (req, res) => {
  // Locate the lot to edit a sample for
  const lot = await RawLot.findById(req.params.lotId);
  if (lot) {
    // Find any existing test for the lot
    const existingTest = await RawTest.findOne({
      lot: req.params.lotId, type: req.body.sampleType });
    if (existingTest && existingTest.samples.length > 0) {
      const currentSample = existingTest.samples.findIndex(sample =>
        sample.number === Number(req.body.sample.number));
      if (currentSample !== -1) {
        Object.assign(existingTest.samples[currentSample], formatExistingRawSample(req.body.sample));
        const savedSample = await existingTest.save();
        if (savedSample) {
          const tests = await RawTest.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
          if (tests) { res.status(201).json(tests);
          } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); }
        } else { res.status(400); throw new Error("Could not save the new sample."); };
      } else { res.status(404); throw new Error("Could not find the sample to edit."); };
    } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); };
  } else { res.status(404); throw new Error("Could not find the lot to edit a sample for."); };
});

const removeRawSample = trycatch( async (req, res) => {
  const test = await RawTest.findById(req.params.testId);
  if (test) {
    test.samples = test.samples.filter(sample => sample.number !== Number(req.params.sampleNumber));
    const savedTest = await test.save();
    if (savedTest) {
      const tests = await RawTest.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
      if (tests) { res.status(201).json(tests);
      } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); }
    } else { res.status(400); throw new Error("Could not delete the sample."); }
  } else { res.status(404); throw new Error("Could not find the test to delete a sample for."); };
})

// Set the results or lab for an existing sample
const formatExistingRawSample = (sample) => {
  return { ...sample,
    lab:            sample.lab,
    results:        sample.results,
    date_sent:      sample.date_sent ? new Date(sample.date_sent + 'T00:00:00') : null,
    date_of_result: sample.date_of_result ? new Date(sample.date_of_result + 'T00:00:00') : null
  }
}

// Create a new empty sample object
const formatNewRawSample = (nextSampleNumber, sample) => {
  return {
    lab: null,
    number: Number(nextSampleNumber),
    amount: Number(sample.amount),
    units:  sample.units,
    results: {},
    date_sampled: new Date(sample.date_sampled + 'T00:00:00'),
    date_sent:    null,
    date_of_result: null,
  }
}

// Create a new empty test object
const formatNewRawTest = (type, lotId, assayId, identityId) => {
  return {
    type:     type,
    lot:      lotId,
    assay:    assayId,
    identity: identityId,
    samples: [],
  }
};

module.exports = { getRawTests, createRawTest, editRawTest, removeRawSample };
