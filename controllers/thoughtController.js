const { Thought } = require("../models");

module.exports = {
  //Get all thoughts 
  //http://localhost:3001/
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error({ message: err });
      return res.status(500).json(err);
    }
  },
  //Get single thought by id and populate()
  //http://localhost:3001/thought/:thoughtId
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate(
        "thought"
      );
  
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Post a new thought
  //http://localhost:3001/thought/:userId
  async getNewThought (req, res) {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Put an update for thought by id
  //http:localhost:3001/thought/:thoughtId
  async updateThoughtById(req, res) {
    try {
      // `doc` is the document _before_ `update` was applied
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        req.body
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete a thought by id
  //http://localhost:3001/thought/:thoughtId
  async deleteThoughtById(req, res) {
    try {
      const deleteThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      )

      if (!deleteThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(deleteUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Post to add reaction to thought list
  //http://localhost:3001/thoughts/:thoughtId/reactions
  async addReaction(req, res) {
    try {
      const addReaction = Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.params.reactions } },
        { new: true }
      )
      res.json(addReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //Delete a reaction by reaction's id
  //http://loaclhost:3001/thoughts/:thoughtId/reaction
  async deleteReaction(req, res) {
    try {
      const deleteReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thought: { reaction: req.body.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!deleteReaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(deleteReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}