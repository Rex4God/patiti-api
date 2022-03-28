const User = require("../models/UserModel");
const {StatusCodes} =require('http-status-codes')
const Event = require("../models/EventModel")
const {IDS} =require("../utils/constants")

const create =async (req, res) => {
  const { 
    id,
    email 
    } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  if (alreadyExistsUser) {
    return res.status(StatusCodes.CONFLICT).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ id, email });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: "Cannot register user at the moment!" });
  });
  if (savedUser) 
  res.status(StatusCodes.CREATED).json({
     savedUser,
     message:'User created Successfully' });
};

const getUser=async (req, res) => {
  const id = req.params.id;
   User.findByPk(id)
    .then(data => {
      const vm ={id:data.id, email:data.email, consents:[]}
      res.send(vm);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving user Details with id=" + id
      });
    });
};
const GetConsents =async (req, res)=>{
  // get all constraints from events table where userId = userId
   const userId = req.query.userId;
  const condition = userId? { userId: {[Op.like]:`%${userId}%` } } : null;
  Event.findAll({ where: condition })
    .then(data => {
      const consentID ={
        userId:data.userId,
        consents: [
          {
            "id": "email_notifications",
            "enabled": false
          },
          {
            "id": "sms_notifications",
            "enabled": true
          }
        ]
      }
      res.send(consentID);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Some error occurred while retrieving consent."
     });
    });
}
  const deleteUser = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "user  was deleted successfully!" });

        } else {
          res.status(StatusCodes.NOT_FOUND).send({message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
        }
      })
      .catch(err => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: "Could not delete user with id=" + id
        });
      });
    };
  
module.exports={
  create,
  getUser,
  deleteUser,
  GetConsents
}
