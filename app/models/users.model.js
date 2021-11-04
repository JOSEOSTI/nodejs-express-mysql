const sql = require("./db.js");

const Users = function(user) {
  this.name = user.name;
  this.lastName = user.lastName;
  this.email = user.email;
  this.userName= user.userName;
  this.password = user.password


};



Users.login = (req, res )=>{
  var email= req.body.email;
  var password = req.body.password;
  sql.query('SELECT * FROM usuario WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull",
          "data":res
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}

Users.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Users.findById = (userId, result) => {
  sql.query(`SELECT * FROM usuario WHERE id_usuario = ${userId} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = result => {
  sql.query("SELECT * FROM usuario ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Users.updateById = (id, user, result) => {
  sql.query(
    "UPDATE usuario SET name = ?, lastname = ?, email = ? , nick_name = ? , password = ?  WHERE id_usuario = ?",
    [user.name, user.lastname, user.email, user.nick_name , user.password , id],
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

      console.log("updated user: ", { id: id, ...user});
      result(null, { id: id, ...user });
    }
  );
};
module.exports = Users;
