const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const router { route } = require('./user');
const userModel = require("../model/user-model");
const userMovieModel = require("../model/user-movie-model");

// router.post("/", (req, res) => {
//     let userData = req.body;
//     // res.send({ userData })

//     userModel.create(userData)
//     .then((doc) => {
//         res.send({ message: "User created successfully"})
//     })
//     .catch((err) => {
//         res.send({ message: "Some problem while creating user"})
//         console.log(err)
//     })

// })

// endpoint for user registration
router.post("/", (req, res) => {
  let user = req.body;

  bcryptjs.genSalt(10, (err, salt) => {
    if (err === null || err === undefined) {
      bcryptjs.hash(user.password, salt, (err, encp) => {
        if (err === null || err === undefined) {
          user.password = encp;
          userModel
            .create(user)
            .then((doc) => {
              res.send({ status: true, message: "User Registered" });
            })
            .catch((err) => {
              res.send({
                status: false,
                message: "Some problem while creating user",
              });
            });
        } else {
          res.send({ status: false, message: "Some problem" });
        }
      });
    } else {
      res.send({ message: "Some problem" });
    }
  });
});

// Login endpoints
router.post("/login", (req, res) => {
  let userCred = req.body;

  userModel
    .findOne({ email: userCred.email })
    .then((user) => {
      // res.send({user})
      if (user !== null || user !== undefined) {
        bcryptjs.compare(userCred.password, user.password, (err, result) => {
          if (err === null || err === undefined) {
            if (result === true) {
              jwt.sign(
                { email: user.email, userId: user._id },
                "secretkey",
                { expiresIn: "2d" },
                (err, token) => {
                  if (err === null || err === undefined) {
                    res.send({
                      status: true,
                      message: "Successfully Login",
                      token,
                      user_name: user.name,
                      user_id: user._id,
                    });
                  } else {
                    res.send({
                      status: false,
                      message: "Some Problem While Generating Token",
                    });
                  }
                }
              );
            } else {
              res.send({ status: false, message: "Incorrect Password" });
            }
          } else {
            res.send({ message: "Some problem" });
          }
        });
      } else {
        res.send({ message: "some problem" });
      }
    })
    .catch((err) => {
      res.send({ message: "User dosnt exist" });
    });
});

// secure end-points
// router.get("/something", verifyToken, (req, res) => {
//     res.send({ message: "i am the most secure endpoint" })
// })

// middleware
function verifyToken(req, res, next) {
  // console.log(req)
  // console.log(req.headers)
  // console.log(req.headers.authorization)

  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secretkey", (err, data) => {
    if (err === null || err === undefined) {
      next();
    } else {
      res.send({ message: "Please provide valid token" });
    }
  });
}

// endpoint to store playing information
router.post("/play", verifyToken, (req,res)=>{
  let user_movie = req.body;

  userMovieModel.findOne({movie:user_movie.movie, user:user_movie.user})
  .then((watchtime)=>{
      if(watchtime === undefined || watchtime === null){
          userMovieModel.create(user_movie)
          .then((doc)=>{
              res.send({status:true, message:"Play info created" , userMovie:doc,})
          })
          .catch((err)=>{
              console.log(err);
              res.send({status:false, message:"Some issue"})
          })
      }
      else{
          res.send({status:true, message:"Play info exist", userMovie:watchtime,})
      }
  })
  .catch((err)=>{
      console.log(err);
      res.send({status:false,message:"Some issue"})
  })
})




// endpoints to Update playing information:-
router.put("/closeplayer/:user_movie_id", verifyToken, (req, res) => {
  let user_movie_id = req.params.user_movie_id;
  let dataToUpdate = req.body;

  userMovieModel
    .updateOne({ _id: user_movie_id }, dataToUpdate)
    .then((res) => {
      console.log(res)
      // res.send({ status: true, message: "Successfully updated" });
    })
    .catch((err) => {
      console.log(err);
      // res.send({ status: false, message: "some err" });
    });
});

module.exports = router;
