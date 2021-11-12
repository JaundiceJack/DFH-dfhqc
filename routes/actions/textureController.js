// Import Libraries
const trycatch = require('express-async-handler');

// Import schemas and make models
const Texture = require('../../models/Texture');

// GET: api/textures/ | Get a list of all textures | Private
const getTextures = trycatch( async (req, res) => {
  const textures = await Texture.find();
  if (textures) res.status(200).json(textures);
  else { res.status(404); throw new Error("Could not locate textures."); };
});

// POST: api/textures/ | Create a new texture | Private
const createTexture = trycatch( async (req, res) => {
  const entries = await formatEntries(req.body);
  const newTexture = new Texture(entries);
  const savedTexture = await newTexture.save();
  if (savedTexture) res.status(201).json(savedTexture);
  else { res.status(401); throw new Error("Unable to save the new texture."); };
});

// POST: api/textures/texture_id | Edit the texture with the given ID | Private
const editTexture = trycatch( async (req, res) => {
  const current = await Texture.findById(req.params.id);
  if (current) {
    const entries = await formatEntries(req.body);
    Object.assign(current, entries);
    const savedEdits = await current.save();
    if (savedEdits) res.status(200).json(savedEdits);
    else { res.status(401); throw new Error("Unable to edit the selected texture."); };
  }
  else { res.status(404); throw new Error("Could not locate the selected texture to edit."); };
});

// DELETE: api/textures/ Remove the texture with the given ID from the database | Private
const removeTexture = trycatch( async (req, res) => {
  const texture = await Texture.findById(req.params.id);
  if (texture) texture.remove().then(() => res.status(200).json({success: true}));
  else { res.status(404); throw new Error("Unable to locate the texture to delete."); };
});

// Validate entries and convert them to the required format
const formatEntries = async body => { return { name: body.name.toLowerCase() }; };

module.exports = {getTextures, createTexture, editTexture, removeTexture};
