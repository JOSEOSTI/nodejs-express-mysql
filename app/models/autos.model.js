const sql = require("./db.js");

// constructor
const Autos = function (auto) {
  this.id_pais = auto.id_pais;
  this.id_ciudad = auto.id_ciudad;
  this.id_marca = auto.id_marca;
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
  sql.query(`SELECT a.id_auto,a.descripcion,a.precio , a.matricula, a.estado, a.anio , a.km , a.color, a.motor ,
  m.nombre_marca , mo.nombre_modelo, s.name_subtipo , t.nombre_transm 
  , c.nombre_combustible, ci.ciudad_nombre,pro.provincia_nombre, pa.pais_nombre
  FROM automovil a
  Inner join marca m On m.id_marca = a.id_marca
  Inner join modelo mo On mo.id_modelo = a.id_modelo
  Inner join subtipo s On s.id_subtipo = a.id_subtipo
  Inner Join transmision t On t.id_transm = a.id_transm
  Inner Join combustible c On c.id_combustible = a.id_combustible
  inner join ciudad ci On ci.id_ciudad = a.id_ciudad
  inner join provincia pro On pro.id_provincia = ci.id_provincia
  inner join pais pa On pa.id_pais = pro.id_pais
  WHERE a.id_auto =${automovilId}
`, (err, res) => {
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
  sql.query(`SELECT DISTINCT  a.id_auto,m.nombre_marca, a.descripcion , a.precio ,a.estado , a.anio ,a.km , i.img_url
  ,p.pais_nombre,c.ciudad_nombre , a.matricula , mo.nombre_modelo
    FROM automovil a
    INNER JOIN marca m ON m.id_marca= a.id_marca
    INNER JOIN modelo mo On mo.id_modelo = a.id_modelo
    INNER JOIN ciudad c ON a.id_ciudad = c.id_ciudad   
    INNER JOIN pais p ON p.id_pais= c.id_pais
    INNER JOIN subtipo sub ON sub.id_subtipo = a.id_subtipo
    INNER JOIN imagen_auto  i ON a.id_auto =i.id_auto
    where i.img_principal=1  and c.ciudad_nombre=${dataAuto}  or a.precio=${dataAuto} or a.anio=${dataAuto}  
    or m.nombre_marca=${dataAuto} or a.estado=${dataAuto} or sub.name_subtipo=${dataAuto}
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
  sql.query(`SELECT a.id_auto,a.descripcion,a.precio , a.estado, a.anio , a.km ,m.nombre_marca , mo.nombre_modelo 
  ,ci.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre
    FROM automovil a
    Inner join marca m On m.id_marca = a.id_marca
    Inner join modelo mo On mo.id_modelo = a.id_modelo
    Inner join subtipo s On s.id_subtipo = a.id_subtipo
    Inner Join transmision t On t.id_transm = a.id_transm
    Inner Join combustible c On c.id_combustible = a.id_combustible
    inner join ciudad ci On ci.id_ciudad = a.id_ciudad
    inner join provincia pro ON pro.id_provincia = ci.id_provincia
    inner join pais pa ON pa.id_pais = pro.id_pais
    
  `, (err, res) => {
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

Autos.AllCombustible = result => {
  sql.query("SELECT nombre_combustible FROM combustible", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ciudad: ", res);
    result(null, res);
  });
};
Autos.AllTransmision = result => {
  sql.query("SELECT nombre_transm FROM transmision", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ciudad: ", res);
    result(null, res);
  });
};

Autos.AllSubtipo = result => {
  sql.query("SELECT name_subtipo FROM subtipo", (err, res) => {
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
