const {DataTypes} = require("sequelize")
const Sequelize = require("../database/db")
const {IDS} = require("../utils/constants")
const User  = require("../models/UserModel")

const Event = Sequelize.define("Events", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull:false
  },
  userId:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      foreignKey:true,
      references:{
        model:User,
        key:'id'

      }
    },
    consents: {
        type:DataTypes.ENUM,
        trim:true,
        values:[IDS.EMAIL_NOTIFICATIONS, IDS.SMS_NOTIFICATIONS,IDS.BOTH, IDS.NONE],
        allowNull:false
      },
})
//Event.belongs(User)

module.exports = Event
