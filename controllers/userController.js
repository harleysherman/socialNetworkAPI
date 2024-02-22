const { User } = require("../models");

module.exports = {
  // Get all users
  //http://localhost:3001/
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error({ message: err });
      return res.status(500).json(err);
    }
  },

  //Get single user by id and populate()
  //http://localhost:3001/user/:userId
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Post a new user
  //http://localhost:3001/user
  async postNewUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Put an update for user by id
  //http://localhost:3001/user/:id
  async updateUser(req, res) {
    console.log("going to update");
    try {
      //console.log(req.body);
      // `doc` is the document _before_ `update` was applied
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete a user by id
  //http://loaclhost:3001/user/:userId
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.deleteOne(
        { _id: req.params.userId },
        // { $pull: { user: { userId: req.params.userId } } },
        // { runValidators: true, new: true }
      );

      if (!deleteUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(deleteUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Remove user's thoughts when user is deleted??

  //Post to add friend to user's friend list
  //http://localhost:3001/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      const userId = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friend: req.params.friendId } },
        { new: true }
      );
      res.json(userId);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //Delete a friend
  //http://localhost:3001/user/:id/friends/:friendId
  async deleteFriend(req, res) {
    try {
      const deleteFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { user: { friend: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!deleteFriend) {
        return res.status(404).json({ message: "No friend with this id!" });
      }

      res.json(deleteFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
