
const express = require("express");

const router = express.Router()

const controller = require('../controllers/EventController')
const userController = require("../controllers/UserController")

router.route('/')
.post(controller.create)
router.route("/:userId").get(userController.GetConsents)

module.exports=router






