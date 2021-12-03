const sql = require("./db.js");

// constructor
const Properties = function (properties) {
  this.id_pais = properties.id_pais;
  this.id_ciudad = properties.id_ciudad;
  this.name = properties.name;
  this.price = properties.price;
  this.description = properties.description;
  this.address = properties.address;
  this.beds = properties.beds;
  this.toileds = properties.toileds;
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
  sql.query(`SELECT * FROM propiedad p 
  INNER JOIN ciudad c ON  p.id_ciudad=c.id_ciudad
  INNER JOIN provincia pro ON  c.id_provincia = pro.id_provincia
    WHERE p.id_prop = ${propertieId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; ssssss
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
  sql.query(`SELECT DISTINCT c.ciudad_nombre,p.id_prop,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,
    p.ubicacion,i.img_url,p.area_total,p.tipo_negociacion,t.nombre_inmueble
      FROM propiedad p
      INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
      INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
      INNER JOIN imagen i ON p.id_prop =i.id_prop 
      where i.img_principal=1  and c.ciudad_nombre=${ciudadName} or p.dormitorios=${ciudadName}
      or p.baños=${ciudadName} or p.tipo_negociacion=${ciudadName} or p.precio=${ciudadName} or t.nombre_inmueble=${ciudadName}
      GROUP BY p.id_prop
  
  `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Properties.getAll = result => {
  sql.query(`SELECT p.id_prop, p.nombre_propiedad, p.precio , p.dormitorios , p.baños,p.description ,p.ubicacion
  , c.ciudad_nombre 
   , provincia_nombre ,pa.pais_nombre, p.tipo_negociacion
   FROM propiedad p
   INNER JOIN ciudad c ON c.id_ciudad=p.id_ciudad
   INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
   INNER JOIN pais pa ON pa.id_pais= pro.id_pais
   order by p.id_prop`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties: ", res);
    result(null, res);
  });
};


Properties.findInerJoin = (propertieId, result) => {
  sql.query(`SELECT * FROM propiedad p inner  join imagen i  on i.id_prop = p.id_prop where i.id_prop = ${propertieId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; ssssss
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


Properties.AllCiudad = result => {
  sql.query("SELECT * FROM ciudad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ciudad: ", res);
    result(null, res);
  });
};

Properties.AllInmuebe = result => {
  sql.query("SELECT * FROM tipo_inmueble", (err, res) => {
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
    [propertie.name, propertie.price, propertie.description, propertie.address, propertie.beds, propertie.toileds, propertie.square, id],
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
