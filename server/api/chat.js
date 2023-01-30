const router = require("express").Router();
const {
  models: { User, Message, Chat },
} = require("../db");

// shows all chats with all messages between two users
router.get("/:userId", async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: Message,
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});

// shows all messages between two users
router.get("/:userId/:friendId", async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        userId: req.params.userId,
        friendId: req.params.friendId,
      },
      include: {
        model: Message,
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
} );

module.exports = router;