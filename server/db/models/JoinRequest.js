// const Sequelize = require("sequelize");
// const db = require("../db");

// const JoinRequest = db.define("join_request", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   compositeId: {
//     type: Sequelize.STRING,
//     unique: true,
//   },
//   statue: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     defaultValue: "inReview",
//     validate: {
//       customValidator: (value) => {
//         const enums = ["inReview", "isMember"];
//         if (!enums.includes(value)) {
//           throw new Error("not a valid option");
//         }
//       },
//     },
//   },
//   request_msg: {
//     type: Sequelize.TEXT,
//   },
//   projectName: {
//     type: Sequelize.STRING,
//   },
//   userName: {
//     type: Sequelize.STRING,
//   },
// });

// module.exports = JoinRequest;
