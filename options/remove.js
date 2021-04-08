const yargsInteractive = require("yargs-interactive");

const Admin = require("../models/Admin");

module.exports = () =>
  new Promise(resolve =>
    yargsInteractive()
      .usage("$0 <command> [args]")
      .interactive({
        interactive: { default: true },
        adminName: {
          type: "input",
          describe: "Enter a name of admin that you want to remove"
        }
      })
      .then(({ adminName }) =>
        Admin.findOne({ adminName }, (err, admin) => {
          if (err) throw err;
          if (!admin) {
            console.log(`Admin with name "${adminName}" does not exist`);
            resolve();
          }
          Admin.deleteOne({ adminName }, err => {
            if (err) throw err;
            console.log(`The admin "${adminName}" has been removed`);
            resolve();
          });
        })
      )
  );
