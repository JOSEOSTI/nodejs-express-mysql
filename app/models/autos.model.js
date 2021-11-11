const sql = require("./db.js");

// constructor
const Autos = function(auto) {
  this.id_pais = auto.id_pais;
  this.id_ciudad = auto.id_ciudad;
  this.marca = auto.marca;
  this.modelo = auto.modelo;
  this.precio = auto.precio
  this.descripcion = auto.descripcion;
  this.matricula = auto.matricula;
  this.estado= auto.estado;
  this.anio= auto.anio;
  this.km = auto.km
};



Autos.create = (newAuto, result) => {
  sql.query("INSERT INTO automovil SET ?", newAuto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created automovil: ", { id: res.insertId, ...newAuto });
    result(null, { id: res.insertId, ...newAuto });
  });
};

Autos.findById = (automovilId, result) => {
  sql.query(`SELECT * FROM automovil WHERE id_auto = ${automovilId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;ssssss
    }

    if (res.length) {
      console.log("found propertie: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
Autos.searchById = (ciudadName, result) => {
  sql.query(`SELECT *
  FROM propiedad
  INNER JOIN ciudad ON propiedad.id_ciudad = ciudad.id_ciudad 
  where ciudad.ciudad_nombre = ${ciudadName} or propiedad.beds=${ciudadName} or propiedad.toileds=${ciudadName} or propiedad.state=${ciudadName} 
  or (propiedad.price = ${ciudadName} )`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log("found propertie: ", res);
      result(null, res);
      return;
    }
    
    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Autos.getAll = result => {
  sql.query("SELECT * FROM automovil", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("automoviles: ", res);
    result(null, res);
  });
};


Autos.findInerJoin = (propertieId, result) => {
  sql.query(`SELECT * FROM propiedad p inner  join imagen i  on i.id_prop = p.id_prop where i.id_prop = ${propertieId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;ssssss
    }

    if (res.length) {
      console.log("found propertie: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Autos.AllCiudad = result => {
  sql.query("SELECT ciudad_nombre FROM ciudad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("ciudad: ", res);
    result(null, res);
  });
};


  
Autos.updateById = (id, propertie, result) => {
  sql.query(
    "UPDATE propiedad SET name = ?, price = ?, description = ? , address = ? , beds = ? , toileds = ? , square = ?  WHERE id_prop = ?",
    [propertie.name, propertie.price, propertie.description, propertie.address , propertie.beds , propertie.toileds,propertie.square , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Propertie with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated propertie: ", { id: id, ...propertie });
      result(null, { id: id, ...propertie });
    }
  );
};

Autos.remove = (id, result) => {
  sql.query("DELETE FROM propiedad WHERE id_prop = ?", id, (err, res) => {
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

Autos.removeAll = result => {
  sql.query("DELETE FROM propiedad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} properties`);
    result(null, res);
  });
};

module.exports = Autos;
