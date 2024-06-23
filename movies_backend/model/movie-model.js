const mongoose = require("mongoose");

// Schema for movies collection
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    releaseDate: {
      type: Date,
      require: true,
    },
    runtime: {
      type: Number,
      require: true,
    },
    genres: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
      minLength: 100,
      maxLength: [300, "Maximum length should be 300"],
    },
    imdbRating: {
      type: Number,
      min: 1,
      max: 10,
    },
    h_posterURL: {
      type: String,
      require: true,
      unique: true,
    },
    v_posterURL: {
      type: String,
      require: true,
      unique: true,
    },
    top: {
      type: Boolean,
      default: false,
    },
    watchers: {
      type: Number,
    },
    filepath:{
      type:String,
      unique:true,

    }
  });

const movieModel = mongoose.model("movies", movieSchema);
// variable name = mongoose.model(collectionName, Schema)

module.exports = movieModel;
