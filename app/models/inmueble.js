const sql = require("./db.js");

const Inmueble = function(inmueble) {
  this.nombre_inmueble= inmueble.nombre_inmueble;


};

Inmueble.create = (newInmueble, result) => {
  sql.query("INSERT INTO tipo_inmueble SET ?", newInmueble, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created imagenes: ", { id: res.insertId, ...newImagen });
    result(null, { id: res.insertId, ...newInmueble });
  });
};
Inmueble.remove = (id, result) => {
  sql.query("DELETE FROM tipo_inmueble WHERE id_tipoInmueble = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted propertie with id: ", id);
    result(null, res);
  });
};


module.exports = Inmueble;
