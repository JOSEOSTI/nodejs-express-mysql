
module.exports = app => {
  const properties = require("../controllers/propertie.controller.js");
  const imagenes = require("../controllers/images.controller.js");

  // Create a news Images
  app.post("/picture", imagenes.create);
  // Retrieve all properties
  app.get("/picture", imagenes.findAll);
  // Create a news Images
  app.get("/picture/:imagenId", imagenes.findOne);

  //FIND ALL ID_PROP
  app.get("/picture/src/:imagenId", imagenes.findOneAll);
  // Create a new Customer
  app.post("/properties", properties.create);

  // Retrieve all properties
  app.get("/properties", properties.findAll);

  // Retrieve a single Customer with customerId
  app.get("/properties/:propertieId", properties.findOne);
  // Retrieve a single Customer with customerId
  app.get("/properties/search/:ciudadName", properties.findSearch);

  // Update a Customer with customerId
  app.put("/properties/:propertieId", properties.update);

  // Delete a Customer with customerId
  app.delete("/properties/:propertieId", properties.delete);

  // Create a new Customer
  app.delete("/properties", properties.deleteAll);
};
