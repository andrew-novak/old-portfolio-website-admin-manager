const Admin = require("../models/Admin");

module.exports = () =>
  new Promise(resolve => {
    Admin.find({}, (err, admins) => {
      if (admins.length < 1) {
        console.log("No admins in database");
        return resolve();
      }
      console.log();
      for (let i = 0; i < admins.length; i++) {
        const { adminName, _id } = admins[i];
        console.log(`adminName : ${adminName}`);
        console.log(`_id       : ${_id}`);
        console.log();
      }
      resolve();
    });
  });
