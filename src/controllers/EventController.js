const Event = require("../models/EventModel");
const {StatusCodes} =require('http-status-codes')

const create= (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //creating of event
  const event = {
    id: req.body.id,
    userId: req.body.userId,
    consents: req.body.consents,
  };

  //  Saving  event
  Event.create(event)
    .then(data => {
      const eventData={
        id:data.id,
        userId:data.userId,
        consents:data.consents
      }
      res.send(eventData);
    })
    .catch(err => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          err.message || "Error while trying to create a event"
      });
    });
};

module.exports={
  create,
  }
