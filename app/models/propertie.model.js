const sql = require("./db.js");

// constructor
const Properties = function(properties) {
  this.id_pais = properties.id_pais;
  this.id_ciudad = properties.id_ciudad;
  this.name = properties.name;
  this.price = properties.price;
  this.description = properties.description;
  this.address = properties.address;
  this.beds= properties.beds;
  this.toileds= properties.toileds;
  this.square = properties.square
};



Properties.create = (newPropertie, result) => {
  sql.query("INSERT INTO propiedad SET ?", newPropertie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created properties: ", { id: res.insertId, ...newPropertie });
    result(null, { id: res.insertId, ...newPropertie });
  });
};

Properties.findById = (propertieId, result) => {
  sql.query(`SELECT * FROM propiedad WHERE id_prop = ${propertieId}`, (err, res) => {
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
Properties.searchById = (ciudadName, result) => {
  sql.query(`SELECT *
  FROM propiedad
  INNER JOIN ciudad ON propiedad.id_ciudad = ciudad.id_ciudad 
  where ciudad.ciudad_nombre = ${ciudadName} or propiedad.beds=${ciudadName} or propiedad.toileds=${ciudadName}
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


Properties.getAll = result => {
  sql.query("SELECT * FROM propiedad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("properties: ", res);
    result(null, res);
  });
};

Properties.AllCiudad = result => {
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



Properties.updateById = (id, propertie, result) => {
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

Properties.remove = (id, result) => {
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

Properties.removeAll = result => {
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

module.exports = Properties;
