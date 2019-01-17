const mongoose = require('mongoose');
const schema_templates = require('./schemas.js')
mongoose.connect('mongodb://localhost/animal_db');

var models = {}
for (schema in schema_templates) {
    models[schema] = mongoose.model(schema, new mongoose.Schema(schema_templates[schema]));
    console.log("Registered: ", schema);
}

module.exports = {
    mongoose: mongoose,
    models: models
}