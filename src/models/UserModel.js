const {DataTypes} = require("sequelize")
const Sequelize = require("../database/db")

const User = Sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      unique: true,
      trim:true,
      required:[true, "Please provide your email address"],
      validate:{
        isEmail: true,
      },
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      allowNull:false
    },
     })

  module.exports = User