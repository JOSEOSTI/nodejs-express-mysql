const sql = require("./db.js");

const Imagenes = function(image) {
  this.img_url = image.img_url;
  this.img_datetime = image.img_datatime;
  this.img_principal = image.img_principal;
  this.img_enable= image.img_enable;
  this.id_prop=image.id_prop

};

Imagenes.create = (newImagen, result) => {
  sql.query("INSERT INTO imagen SET ?", newImagen, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created imagenes: ", { id: res.insertId, ...newImagen });
    result(null, { id: res.insertId, ...newImagen });
  });
};

Imagenes.findById = (imagenId, result) => {
  sql.query(`SELECT * FROM imagen WHERE img_principal = 1 and id_prop = ${imagenId} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
Imagenes.findByAll = (imagenId, result) => {
  sql.query(`SELECT * FROM imagen WHERE  id_prop = ${imagenId} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found image: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Imagenes.getAll = result => {
  sql.query("SELECT * FROM imagen ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties: ", res);
    result(null, res);
  });
};
module.exports = Imagenes;
