const sql = require("./db.js");

// constructor
const Properties = function (properties) {
  this.id_tipoInmueble = properties.id_tipoInmueble;
  this.id_ciudad = properties.id_ciudad;
  this.id_tipoNegocio = properties.id_tipoNegocio;
  this.codigo_propiedad = properties.codigo_propiedad;
  this.nombre_propiedad = properties.nombre_propiedad;
  this.precio = properties.precio;
  this.description = properties.description;
  this.ubicacion = properties.ubicacion;
  this.dormitorios = properties.dormitorios;
  this.sala = properties.sala;
  this.comedor = properties.comedor;
  this.cocina = properties.cocina;
  this.baños = properties.baños;
  this.latitud = properties.latitud;
  this.longitud = properties.longitud;
  this.estacionamiento_v = properties.estacionamiento_v,
    this.bodega = properties.bodega,
    this.a_lavanderia = properties.a_lavanderia,
    this.piscina = properties.piscina,
    this.terraza = properties.terraza,
    this.guardiania = properties.seguridad,
    this.enabled_propiedad = properties.enabled_propiedad
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
  sql.query(`SELECT p.id_prop,  p.nombre_propiedad, ti.nombre_inmueble, p.precio , p.description, p.ubicacion,p.dormitorios
  ,p.sala,p.comedor,p.cocina,p.baños,p.estudio,p.a_lavanderia,p.piscina,p.sauna,p.turco
  ,p.sala_comunal,p.a_verdes,p.a_juegosIn,p.serv_basicos,p.guardiania,p.seg_incendios,p.planta_emergencia,
  p.estacionamiento_v,p.ascensor,p.gimnasio,p.gas_centralizado,p.linea_telefonica,p.acabados,p.bodega
  ,p.cuarto_maquinas,p.patio,p.area_bbq,p.balcon,p.cisterna,p.anden_car_descr,p.galpon,p.cerramiento,p.antiguedad
  ,p.area_total,p.area_contruccion, p.terraza,c.ciudad_nombre,pro.provincia_nombre, tn.nombre_negocio,p.latitud,p.longitud
   FROM propiedad p 
   INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
   INNER JOIN tipo_inmueble ti ON ti.id_tipoInmueble = p.id_tipoInmueble
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
  sql.query(`SELECT  p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where    c.ciudad_nombre=${ciudadName} or p.dormitorios=${ciudadName} 
        or p.baños=${ciudadName}  or tn.nombre_negocio=${ciudadName}  or p.precio=${ciudadName} 
         or t.nombre_inmueble=${ciudadName}  and i.img_principal=1
  order by p.id_prop
  
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
Properties.searchBañosId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.baños=${ciudadName}  and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchDormitoriosId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.dormitorios=${ciudadName}  and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchEstudioId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud,p.sala,p.estudio
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.estudio and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchSalaId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud,p.sala
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.sala and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchCocinaId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud,p.sala,p.estudio
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.cocina and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchParqueaderoId = (ciudadName, result) => {
  sql.query(`SELECT distinct p.id_prop, c.ciudad_nombre,pro.provincia_nombre,pa.pais_nombre,p.nombre_propiedad,
  p.precio,p.dormitorios,p.baños,p.description,p.ubicacion,i.img_url,p.area_total,t.nombre_inmueble ,tn.nombre_negocio,
  p.latitud,p.longitud,p.sala,p.estudio
   FROM propiedad p
        INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
        INNER JOIN pais pa ON pa.id_pais = pro.id_pais 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where   
         p.estacionamiento_v and i.img_principal=1
  group by p.id_prop
  
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
Properties.searchById1 = (ciudadName, result) => {
  sql.query(`SELECT  p.id_prop,i.img_url FROM propiedad p
        INNER JOIN ciudad c ON p.id_ciudad = c.id_ciudad 
        INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia 
        INNER JOIN tipo_inmueble t ON t.id_tipoInmueble = p.id_tipoInmueble
        INNER JOIN imagen i ON p.id_prop =i.id_prop 
        where    c.ciudad_nombre=${ciudadName} or p.dormitorios=${ciudadName}
        or p.baños=${ciudadName} or p.tipo_negociacion=${ciudadName} or p.precio=${ciudadName} 
        or t.nombre_inmueble=${ciudadName} and i.img_principal=0
        group by i.img_url;
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
   , provincia_nombre ,pa.pais_nombre,tn.nombre_negocio
   FROM propiedad p
   INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
   INNER JOIN ciudad c ON c.id_ciudad=p.id_ciudad
   INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
   INNER JOIN pais pa ON pa.id_pais= pro.id_pais
   WHERE p.estado=1
   order by p.id_prop`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("properties: ", res);
    result(null, res);
  });
};

Properties.getAll1 = result => {
  sql.query(`SELECT p.id_prop, p.nombre_propiedad, p.precio , p.dormitorios , p.baños,p.description ,p.ubicacion
  , c.ciudad_nombre 
   , provincia_nombre ,pa.pais_nombre,tn.nombre_negocio, p.codigo_propiedad
   FROM propiedad p
   INNER JOIN tipo_negociacion tn ON tn.id_tipoNegocio = p.id_tipoNegocio
   INNER JOIN ciudad c ON c.id_ciudad=p.id_ciudad
   INNER JOIN provincia pro ON pro.id_provincia = c.id_provincia
   INNER JOIN pais pa ON pa.id_pais= pro.id_pais
   where p.enabled_propiedad="1"
   order by p.id_prop`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("properties: ", res);
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
      // console.log("found propertie: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Properties.AllCiudad = result => {
  sql.query(`SELECT distinct c.ciudad_nombre , c.id_ciudad FROM club_trueque.ciudad  c Inner join propiedad pro on c.id_ciudad = pro.id_ciudad 
  order by c.id_ciudad;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("ciudad: ", res);
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

    // console.log("ciudad: ", res);
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

      // console.log("updated propertie: ", { id: id, ...propertie });
      result(null, { id: id, ...propertie });
    }
  );
};

Properties.remove = (id, result) => {
  sql.query("UPDATE propiedad SET  enabled_propiedad = ? WHERE id_prop = ?", [enabled_propiedad = "0", id], (err, res) => {
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
