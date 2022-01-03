const sql = require("./db.js");

// constructor
const Banners = function (auto) {
  this.nombre = auto.nombre;
  this.titulo = auto.titulo;
  this.media_url = auto.media_url;
  this.fecha_inicio= auto.fecha_inicio;
  this.fecha_fin= auto.fecha_fin;
  this.activa = auto.type;

  
};



Banners.create = (newBanner, result) => {
  sql.query("INSERT INTO banner SET ?", newBanner, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Banner: ", { id: res.insertId, ...newBanner });
    result(null, { id: res.insertId, ...newBanner });
  });
};

Banners.getFindId = (bannerId, result) => {
  sql.query(`
  SELECT * FROM  banner where type= ${bannerId};
`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found ¿banner: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
module.exports = Banners;