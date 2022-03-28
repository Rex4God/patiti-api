
const express = require("express");

const router = express.Router()

const controller= require('../controllers/UserController')
//const eventController = require("../controllers/EventController")

router.route('/')
.post(controller.create)
router.route('/:id')
.get(controller.getUser)
.delete(controller.deleteUser)






module.exports=router