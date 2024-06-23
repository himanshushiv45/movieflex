const express = require("express");
const router = express.Router();
const fs = require("fs");

const movieModel = require("../model/movie-model");

// api endpoint for creating movie
router.post("/", (req, res) => {
  let movieData = req.body;
  movieModel
    .create(movieData)
    .then((doc) => {
      res.send({ message: "Movie Created" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some problem while creating movie" });
    });
});

// API to fetch all movies
router.get("/", (req, res) => {
  movieModel
    .find()
    .then((movies) => {
      res.send({ status: true, movies });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "Something err while fetching movies",
      });
    });
});

// API for fetch Single Movie

router.get("/:id", (req, res) => {
  let movieId = req.params.id;

  movieModel
    .findOne({ _id: movieId })
    .then((movie) => {
      res.send({ status: true, movie });
    })
    .catch((err) => {
      res.send({ status: false, message: "Some Problem" });
    });
});

let movie_id = null;
let filePath = null;

router.get("/stream/:id", async (req, res) => {
  if (movie_id === null || movie_id !== req.params.id) {
    try {
      movie_id = req.params.id;
      let movieRes = await movieModel.findOne({ _id: req.params.id });
      filePath = movieRes.filepath;
    } catch (err) {
      console.log(err);
    }
  }

  const range = req.headers.range;

  if (!range) {
    res.send({ message: "Range header is required" });
  }
  const videoSize = fs.statSync("./" + filePath).size;

  const start = Number(range.replace(/\D/g, ""));

  const end = Math.min(start + 10 ** 6, videoSize - 1);

  const contentLength = end - start + 1;

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  });
  const readStream = fs.createReadStream("./" + filePath, { start, end });
  readStream.pipe(res);
  // readStream.on("data",(chunck)=>{
  //     res.send(chunck)
  // })
});

module.exports = router;
