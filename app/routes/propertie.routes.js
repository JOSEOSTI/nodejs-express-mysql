
module.exports = app => {
  const properties = require("../controllers/propertie.controller.js");
  const imagenes = require("../controllers/images.controller.js");
  const users = require("../controllers/users.controller.js");
  const autos = require("../controllers/autos.controller.js");


  //------------------------------------------------------------------//
  // RestAPI  Imageens

  //create new images
  app.post("/picture", imagenes.create);
  // Retrieve all images
  app.get("/picture", imagenes.findAll);
  // Retrieve images for  imag_pricipal
  app.get("/picture/:imagenId", imagenes.findOne);
  // Retrieve images for  imag_pricipal
  app.get("/picture/automovil/:imagenId", imagenes.autoOne);
  // Retrieve images for  imag_pricipal when  id_prop=id_prop
  app.get("/picture/src/:imagenId", imagenes.findOneAll);

  app.get("/picture/automovil/picture/:imagenId", imagenes.findAutoAll);

  //  ------------------------------------------------------------------//
  //Ciudad//
  app.get("/properties/ciudad", properties.findAllCity);
  //------------------------------------------------------------------//
  // RestAPI Propiedades

  app.post("/properties", properties.create);

  // Retrieve all properties
  app.get("/properties", properties.findAll);

  // Retrieve a single Customer with customerId
  app.get("/properties/:propertieId", properties.findOne);

  // Retrieve a single Customer with customerId
  app.get("/properties/src/:propertieId", properties.findInnerJ);


  // Retrieve a single Customer with customerId
  app.get("/properties/search/:ciudadName", properties.findSearch);

  // Update a Customer with customerId
  app.put("/properties/:propertieId", properties.update);

  // Delete a Customer with customerId
  app.delete("/properties/:propertieId", properties.delete);

  // Create a new Customer
  app.delete("/properties", properties.deleteAll);

  //------------------------------------------------------------------//
  // RestAPI Automoviles
  //  ------------------------------------------------------------------//
  //Ciudad//
  app.get("/automoviles/marca", autos.findAllMarca);
  //------------------------------------------------------------------//
  // RestAPI Propiedades
  app.post("/automoviles", autos.create);

  // Retrieve all automoviles
  app.get("/automoviles", autos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/automoviles/:automovilId", autos.findOne);

  // Retrieve a single Customer with customerId
  app.get("/automoviles/src/:propertieId", properties.findInnerJ);


  // Retrieve a single Customer with customerId
  app.get("/automoviles/search/:dataAuto", autos.findSearch);

  // Update a Customer with customerId
  app.put("/automoviles/:propertieId", properties.update);

  // Delete a Customer with customerId
  app.delete("/properties/:propertieId", properties.delete);

  // Create a new Customer
  app.delete("/properties", properties.deleteAll);

  /////--------------------USERS--------------------------------///
  app.post("/users/register", users.create);

  // Retrieve all properties
  app.get("/users", users.findAll);

  app.get("/users/:userId", users.findUserId);

  app.put("/users/:updateUser", users.update);

  ///////////*-------------------LOGIN---------*----------------////
  app.post("/users/login", users.login);
  app.post("/users/upload", users.imgUpdate);
  app.get("/users/img/avatar/:avatarId", users.getImgUser);


};