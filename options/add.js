const yargsInteractive = require("yargs-interactive");
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");

const validate = (adminName, password) => {
  if (!adminName) return "No admin name provided";
  if (!password) return "No admin password provided";
  return;
};

module.exports = () =>
  new Promise(resolve =>
    yargsInteractive()
      .usage("$0 <command> [args]")
      .interactive({
        interactive: { default: true },
        adminName: {
          type: "input",
          describe: "Enter an admin name"
        },
        password: {
          type: "password",
          describe: "Enter a password"
        }
      })
      .then(({ adminName, password }) => {
        const error = validate(adminName, password);
        Admin.findOne({ adminName }, (err, admin) => {
          if (err) throw err;
          if (admin) {
            console.log("This admin name is already taken");
            resolve();
          }
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, passwordHash) => {
              if (err) throw err;
              Admin.create({ adminName, passwordHash }, (err, admin) => {
                if (err) throw err;
                console.log(`The admin "${adminName}" has been added`);
                resolve();
              });
            });
          });
        });
      })
  );
