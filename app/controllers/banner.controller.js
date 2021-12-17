const Banners  = require("../models/banner.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Propertie
  const banner = new Banners({
    nombre: req.body.nombre,
    titulo:req.body.titulo,
    media_url : req.body.media_url,
    fecha_inicio:req.body.fecha_inicio,
    fecha_fin:req.body.fecha_fin,
    activa:req.body.activa,
    type:req.body.type
  });


  // Save Propertie in the database
  Banners.create(banner, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Propertie."
      });
    else res.send(data);
  });
};


// Retrieve all propertie from the database.
exports.findAll = (req, res) => {
    Banners.getFindId(req.params.bannerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Banner with id ${req.params.bannerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Banner with id " + req.params.bannerId
            });
          }
        } else res.send(data);
      });
};

