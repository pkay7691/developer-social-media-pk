const router = require("express").Router();
const {
  models: { User, Message, Chat },
} = require("../db");

// shows all chats with all messages between two users
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.send(messages)
  } catch (err) {
    next(err);
  }
});

// shows all messages between two users
router.post("/", async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body)
    res.send(newMessage);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
