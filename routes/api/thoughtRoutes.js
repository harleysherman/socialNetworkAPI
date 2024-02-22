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
  getThoughts,
  getThoughtById,
  getNewThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .post(getNewThought)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
