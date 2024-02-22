const { User } = require("../models");
const router = require("express").Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error({ message: err });
    return res.status(500).json(err);
  }
});

//Get single user by id and populate()
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "user"
    );

    !post
      ? res.status(404).json({ message: "No user with that ID" })
      : res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post a new user
router.post("/user", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Put an update for user by id
router.put("/user/:id", async (req, res) => {
  try {
    // `doc` is the document _before_ `update` was applied
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a user by id
router.delete('/user/:id',  async (req, res) => {
    try {
      const deleteUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { responses: { responseId: req.params.userId } } },
        { runValidators: true, new: true }
      )

      if (!deleteUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(deleteUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Remove user's thoughts when user is deleted??

//Post to add friend to user's friend list
router.post("/users/:userId/friends/:friendId", async (req, res) => {
  try {
    const userId = User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.params.friendId } },
      { new: true }
    )
    res.json(userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a friend
router.delete('/user/:id/friends/:friendId',  async (req, res) => {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { responses: { friend: req.params.friendId } } },
        { runValidators: true, new: true }
      )

      if (!deleteFriend) {
        return res.status(404).json({ message: 'No friend with this id!' });
      }

      res.json(deleteFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  });
