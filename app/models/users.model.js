const sql = require("./db.js");

const Users = function(user) {
  this.name = user.name;
  this.lastName = user.lastName;
  this.email = user.email;
  this.userName= user.userName;
  this.password = user.password


};



Users.login = (request, response )=>{
  var email = request.body.email;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			  
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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
