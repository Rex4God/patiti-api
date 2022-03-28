const {DataTypes} = require("sequelize")
const Sequelize = require("../database/db")
const {IDS} = require("../utils/constants")

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
    },
    consents: {
        type:DataTypes.ENUM,
        trim:true,
        values:[IDS.EMAIL_NOTIFICATIONS, IDS.SMS_NOTIFICATIONS,IDS.BOTH, IDS.NONE],
        allowNull:false
      },
})

module.exports = Event
