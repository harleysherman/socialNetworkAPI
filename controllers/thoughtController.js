const { Thought, Reaction } = require("../models");

module.exports = {
  //Get all thoughts 
  //http://localhost:3001/
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      //console.error({ message: err });
      return res.status(500).json(err);
    }
  },
  //Get single thought by id and populate()
  //http://localhost:3001/thought/:thoughtId
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
  
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Post a new thought
  //http://localhost:3001/thought/
  async createThought (req, res) {
    //console.log("creating thought");
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
      //console.log(newThought);
    } catch (err) {
      res.status(500).json(err);
      //console.log(err);
    }
  },
  //Put an update for thought by id
  //http:localhost:3001/thought/
  async updateThoughtById(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true },
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
      //console.log("Here in try {}");
      const deleteThought = await Thought.deleteOne(
        { _id: req.params.thoughtId },
        // { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        // { runValidators: true, new: true }
      );
      console.log(deleteThought);

      if (!deleteThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(deleteThought);
    } catch (err) {
      res.status(500).json(err);
      //console.log(err);
    }
  },
  //Post to add reaction to thought list
  //http://localhost:3001/thoughts/:thoughtId/reactions
  async postReaction(req, res) {
    try {
      //console.log("in the try");
      const postReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      console.log(postReaction);
      res.json(postReaction);
    } catch (err) {
      //console.log(err);
      res.status(500).json(err);
    }
  },
  //Delete a reaction by reaction's id
  //http://loaclhost:3001/thoughts/:thoughtId/reactions
  async deleteReaction(req, res) {
    try {
      const deleteReaction = await Thought.deleteOne(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!deleteReaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(deleteReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}