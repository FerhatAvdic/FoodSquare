const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Recipe Schema
const RecipeSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userId:{
      type: Schema.Types.ObjectId,
      required: true
  }
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);
