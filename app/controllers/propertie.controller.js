const Properties = require("../models/propertie.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Propertie
  const propertie = new Properties({

    id_tipoInmueble: req.body.id_tipoInmueble,
    id_ciudad: req.body.id_ciudad,
    id_tipoNegocio: req.body.id_tipoNegocio,
    codigo_propiedad: req.body.codigo_propiedad,
    nombre_propiedad: req.body.nombre_propiedad,
    precio: req.body.precio,
    description: req.body.description,
    ubicacion: req.body.ubicacion,
    dormitorios: req.body.dormitorios,
    sala: req.body.sala,
    comedor: req.body.comedor,
    cocina: req.body.cocina,
    baños: req.body.baños,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    estacionamiento_v: req.body.estacionamiento_v,
    bodega: req.body.bodega,
    a_lavanderia: req.body.a_lavanderia,
    piscina: req.body.piscina,
    terraza: req.body.terraza,
    guardiania: req.body.seguridad,
enabled_propiedad:req.body.enabled_propiedad
  });


  // Save Propertie in the database
  Properties.create(propertie, (err, data) => {
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
  Properties.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};
exports.findAll1 = (req, res) => {
  Properties.getAll1((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};

exports.findAllCity = (req, res) => {
  Properties.AllCiudad((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving City."
      });
    else res.send(data);
  });
};

exports.findAllInmueble = (req, res) => {
  Properties.AllInmuebe((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving City."
      });
    else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findOne = (req, res) => {
  Properties.findById(req.params.propertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.propertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.propertieId
        });
      }
    } else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findInnerJ = (req, res) => {
  Properties.findInerJoin(req.params.propertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.propertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.propertieId
        });
      }
    } else res.send(data);
  });
};
// Find a single Propertie with a ciudadName
exports.findSearch = (req, res) => {
  Properties.searchById(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchBaños = (req, res) => {
  Properties.searchBañosId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchDormitorios = (req, res) => {
  Properties.searchDormitoriosId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchEstudio = (req, res) => {
  Properties.searchEstudioId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchSala = (req, res) => {
  Properties.searchSalaId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchCocina = (req, res) => {
  Properties.searchCocinaId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearchParqueadero = (req, res) => {
  Properties.searchParqueaderoId(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
exports.findSearch1 = (req, res) => {
  Properties.searchById1(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status: 0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status: 0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
        });
      }
    } else res.send(data);
  });
};
// Update a Propertie identified by the propertieId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Properties.updateById(
    req.params.propertieId,
    new Properties(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Propertie with id ${req.params.propertieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Propertie with id " + req.params.propertieId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Properties.remove(req.params.propertieId, (err, data) => {
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
  Properties.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all propertie"
      });
    else res.send({ message: `All Propertie were deleted successfully!` });
  });
};
