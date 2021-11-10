const  Users = require("../models/users.model.js");
const sql = require("../models/db.js");
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new Users({

    name: req.body.name,
    lastName : req.body.lastName,
    email :req.body.email,
    userName: req.body.userName,
    password : req.body.password,
    // phone :req.body.phone,
    // address:req.body.address,
    // city:req.body.city,
    // estate:req.body.city,
    // zipCode:req.body.zipCode
  
  });


  // Save Puser in the database
  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all propertie from the database.
exports.findAll = (req, res) => {
  Users.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};

/////***FindId****///
// Find a single Propertie with a propertieId
exports.findUserId = (req, res) => {
  Users.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};


const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
      cb(null, Date.now()  + file.originalname)
  }
})
const uploadImage = multer({
  storage: diskstorage,
  limits: {fileSize: 1000000}
}).single('image');
////////igmpost////
exports.imgUpdate =(req,res)=>{
  const request = req;
  const response = res;
  uploadImage(request , response , (err) => {
    // const type = req.file.mimetype
    const name = request.file.originalname
    console.log(name)
    // const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

    sql.query(`INSERT INTO imguser (img)
    VALUES ('${name}'); `, (err, rows) => {
        if(err) return response.status(500).send('server error')

        response.send('image saved!')
    })
});
}


exports.getImgUser =(req,res)=>{
  
    const id = req.params.avatarId
    console.log(id)
    sql.query(`Select * from imguser  where id_usuario =${id}`, (err, rows) => {
        if(err) return res.status(500).send('server error')

        // rows.map(data=>{
        //   fs.writeFileSync(path.join(__dirname,  '../images'+ data.id_imguser +'.png'),data.img)
        // })

        const imagesdir = fs.readdirSync(path.join(__dirname, '../images'))

        res.send(imagesdir )
    })

}
////*******login******* *//

  exports.login = (request, response )=>{
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
      sql.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        if (results.length > 0) {        
          response.send(results); 
        } else {
          response.send({status:0 , message:"Incorrect Username and/or Password!"});
        }			
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  }


// Update a Propertie identified by the propertieId in the request
exports.update = (req, res) => {
  console.log(req)
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Users.updateById(
    req.params.updateUser,
    new Users(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userd}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Users.remove(req.params.propertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.propertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Propertie with id " + req.params.propertieId
        });
      }
    } else res.send({ message: `Propertie was deleted successfully!` });
  });
};

// Delete all Propertie from the database.
exports.deleteAll = (req, res) => {
  Users.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all propertie"
      });
    else res.send({ message: `All Propertie were deleted successfully!` });
  });
};
