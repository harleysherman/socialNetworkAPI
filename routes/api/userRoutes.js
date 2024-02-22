//const { User } = require("../models");
// const router = require("express").Router();

// // Get all users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error({ message: err });
//     return res.status(500).json(err);
//   }
// });

// //Get single user by id and populate()
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.userId }).populate(
//       "user"
//     );

//     post
//        res.status(404).json({ message: "No user with that ID" })
//       : res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Post a new user
// router.post("/user", async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Put an update for user by id
// router.put("/user/:id", async (req, res) => {
//   try {
//     // `doc` is the document _before_ `update` was applied
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Delete a user by id
// router.delete('/user/:id',  async (req, res) => {
//     try {
//       const deleteUser = await User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $pull: { responses: { responseId: req.params.userId } } },
//         { runValidators: true, new: true }
//       )

//       if (!deleteUser) {
//         return res.status(404).json({ message: 'No user with this id!' });
//       }

//       res.json(deleteUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //Remove user's thoughts when user is deleted??

// //Post to add friend to user's friend list
// router.post("/users/:userId/friends/:friendId", async (req, res) => {
//   try {
//     const userId = User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { friend: req.params.friendId } },
//       { new: true }
//     )
//     res.json(userId);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// //Delete a friend
// router.delete('/user/:id/friends/:friendId',  async (req, res) => {
//     try {
//       const deleteFriend = await User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $pull: { responses: { friend: req.params.friendId } } },
//         { runValidators: true, new: true }
//       )

//       if (!deleteFriend) {
//         return res.status(404).json({ message: 'No friend with this id!' });
//       }

//       res.json(deleteFriend);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


// const { Thought } = require("../models");
// const router = require("express").Router();

// // Get all thoughts
// router.get("/", async (req, res) => {
//   try {
//     const thoughts = await Thought.find();
//     res.json(thoughts);
//   } catch (err) {
//     console.error({ message: err });
//     return res.status(500).json(err);
//   }
// });

// //Get single thought by id and populate()
// router.get("/thought/:thoughtId", async (req, res) => {
//   try {
//     const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate(
//       "thought"
//     );

//     thought
//        res.status(404).json({ message: "No thought with that ID" })
//       : res.json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Post a new thought
// router.post("/thought/:userId", async (req, res) => {
//   try {
//     const newThought = await Thought.create(req.body);
//     res.json(newThought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Put an update for thought by id
// router.put("/thought/:thoughtId", async (req, res) => {
//   try {
//     // `doc` is the document _before_ `update` was applied
//     const updatedThought = await Thought.findOneAndUpdate(
//       { _id: req.params.userId },
//       req.body
//     );
//     res.json(updatedThought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //Delete a thought by id
// router.delete('/thought/:thoughtId',  async (req, res) => {
//     try {
//       const deleteThought = await Thought.findOneAndUpdate(
//         { _id: req.params.thoughtId },
//         { $pull: { responses: { responseId: req.params.thoughtId } } },
//         { runValidators: true, new: true }
//       )

//       if (!deleteThought) {
//         return res.status(404).json({ message: 'No thought with this id!' });
//       }

//       res.json(deleteUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //Post to add reaction to thought list
// router.post("/thoughts/:thoughtId/reactions", async (req, res) => {
//   try {
//     const addReaction = Thought.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $addToSet: { reaction: req.params.reactions } },
//       { new: true }
//     )
//     res.json(addReaction);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// //Delete a reaction by reaction's id
// router.delete('/thoughts/:thoughtId/reactions',  async (req, res) => {
//     try {
//       const deleteReaction = await Thought.findOneAndUpdate(
//         { _id: req.params.thoughtId },
//         { $pull: { responses: { reaction: req.body.reactionId } } },
//         { runValidators: true, new: true }
//       )

//       if (!deleteReaction) {
//         return res.status(404).json({ message: 'No reaction with this id!' });
//       }

//       res.json(deleteReaction);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

const router = require('express').Router();
const {
  getUsers,
  getUserById,
  postNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/
router.route('/').get(getUsers);

// /api/user
router.route('/').post(postNewUser);

// /api/user/:userId
router
  .route('/:userId')
  .get(getUserById)
//.post(getNewThought)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
