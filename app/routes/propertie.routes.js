
module.exports = app => {
  const properties = require("../controllers/propertie.controller.js");
  const imagenes = require("../controllers/images.controller.js");
  const users = require("../controllers/users.controller.js");
  const autos = require("../controllers/autos.controller.js");
  const banner = require("../controllers/banner.controller.js");
  const inmueble = require("../controllers/inmueble.js");


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
  //Inmueble//
  app.get("/properties/inmueble", properties.findAllInmueble);
  //------------------------------------------------------------------//
  //  ------------------------------------------------------------------//
  //Ciudad//
  app.get("/properties/ciudad", properties.findAllCity);
  //------------------------------------------------------------------//
  // RestAPI Propiedades
  app.post("/properties", properties.create);

  // Retrieve all properties
  app.get("/properties", properties.findAll);
  app.get("/propertiesList", properties.findAll1);


  // Retrieve a single Customer with customerId
  app.get("/properties/:propertieId", properties.findOne);

  // Retrieve a single Customer with customerId
  app.get("/properties/src/:propertieId", properties.findInnerJ);


  // Retrieve a single Customer with customerId
  app.get("/properties/search/:ciudadName", properties.findSearch);
  app.get("/properties/searchB/:ciudadName", properties.findSearchBaños);
  app.get("/properties/searchD/:ciudadName", properties.findSearchDormitorios);
  app.get("/properties/search/-/Estudio/", properties.findSearchEstudio);
  app.get("/properties/search/-/Sala/", properties.findSearchSala); 
  app.get("/properties/search/-/Cocina/", properties.findSearchCocina);
  app.get("/properties/search/-/Parqueadero/", properties.findSearchParqueadero);
  app.get("/properties/searchImg/:ciudadName", properties.findSearch1);


  // Update a Customer with customerId
  app.put("/properties/:propertieId", properties.update);

  // Delete a Customer with customerId
  app.delete("/properties/delete/:propertieId", properties.delete);

  // Create a new Customer
  app.delete("/properties", properties.deleteAll);

  //------------------------------------------------------------------//
  // RestAPI Automoviles
  //  ------------------------------------------------------------------//
  //Marca//
  app.get("/automoviles/marca", autos.findAllMarca);
  //Subtipo//
  app.get("/automoviles/subtipo", autos.findAllSubtipo);
  //Combustible//
  app.get("/automoviles/combustible", autos.findAllCombust);
  //Transmicion//
  app.get("/automoviles/transmision", autos.findAllTrans);
  //------------------------------------------------------------------//
  // RestAPI Propiedades
  app.post("/automoviles", autos.create);

  // Retrieve all automoviles
  app.get("/automoviles", autos.findAll);

  // Retrieve a single Customer with customerId
  app.get("/automoviles/-/:automovilId", autos.findOne);

  // Retrieve a single Customer with customerId
  app.get("/automoviles/src/:propertieId", properties.findInnerJ);

  // Retrieve a single Customer with customerId
  app.get("/automoviles/search/:dataAuto", autos.findSearch);



  /////--------------------USERS--------------------------------///
  app.post("/users/register", users.create);

  // Retrieve all properties
  app.get("/users", users.findAll);

  app.get("/users/:userId", users.findUserId);

  app.put("/users/:updateUser", users.update);

  /////--------------------inmueble--------------------------------///
  app.post("/inmueble", inmueble.create);
  app.delete("/inmueble/delete/:inmuebleId",inmueble.delete);

  ///////////*-------------------LOGIN---------*----------------////
  app.post("/users/login", users.login);
  app.post("/users/upload", users.imgUpdate);
  app.get("/users/img/avatar/:avatarId", users.getImgUser);






  /////--------------Banners-----------------------------//
  app.post("/banner/register", users.create);


  app.get("/banner/findId/:bannerId", banner.findAll);

};