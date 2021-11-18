const sql = require("./db.js");

// constructor
const Autos = function (auto) {
  this.id_pais = auto.id_pais;
  this.id_ciudad = auto.id_ciudad;
  this.marca = auto.marca;
  this.modelo = auto.modelo;
  this.precio = auto.precio
  this.descripcion = auto.descripcion;
  this.matricula = auto.matricula;
  this.estado = auto.estado;
  this.anio = auto.anio;
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
  sql.query(`SELECT * FROM automovil  a 
  inner join marca m On m.id_marca=a.id_marca
  WHERE id_auto =${automovilId}`, (err, res) => {
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
Autos.searchById = (dataAuto, result) => {
  sql.query(`SELECT DISTINCT  a.id_auto,m.nombre_marca,a.modelo , a.descripcion , a.precio ,a.estado , a.anio ,a.km , i.img_url
  ,p.pais_nombre,c.ciudad_nombre , a.matricula
    FROM automovil a
    INNER JOIN marca m ON m.id_marca= a.id_marca   
    INNER JOIN ciudad c ON a.id_ciudad = c.id_ciudad   
    INNER JOIN pais p ON p.id_pais= c.id_pais 
    INNER JOIN imagen_auto  i ON a.id_auto =i.id_auto
    where i.img_principal=1  and c.ciudad_nombre=${dataAuto}  or a.precio=${dataAuto} or a.anio=${dataAuto}  or m.nombre_marca=${dataAuto} 
    GROUP BY a.id_auto `, (err, res) => {
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


Autos.AllMarca = result => {
  sql.query("SELECT nombre_marca FROM marca", (err, res) => {
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
