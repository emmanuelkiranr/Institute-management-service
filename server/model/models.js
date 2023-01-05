import sequelize from "./db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING(20),
  },
  lastname: {
    type: DataTypes.STRING(20),
  },
  fullName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  board_12: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Institute_12: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  mark_12: {
    type: DataTypes.FLOAT(10, 10),
    allowNull: false,
  },
  board_10: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Institute_10: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  mark_10: {
    type: DataTypes.FLOAT(10, 10),
    allowNull: false,
  },
  entrance: {
    type: DataTypes.FLOAT(10, 10),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fatherName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  motherName: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  pemail: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  pphone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
});

const Account = sequelize.define("Account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
});

// A user has 2 accounts[student and parent] so one to many
// The user table can be created/exist without Account table but the account table cannot exist without user table so the foreign key should
// be added in the Account table
User.hasMany(Account); // This will create a column userId in the Account table - with no values

Account.belongsTo(User); // (same as above) This puts the foreign key userId in the Account table
// 2 statements so that we can use the utilities method that sequelize provides on both of these tables

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseName: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  courseCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
});

const Mark = sequelize.define("Mark", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
});

Course.hasMany(Mark);
Mark.belongsTo(Course);

User.hasMany(Mark);
Mark.belongsTo(User);

export { User, Account, Course, Mark };
