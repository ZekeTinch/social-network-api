const { Thoughts, User, Reactions } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async getSingleThoughts(req, res) {
        try {
        const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId });

        if (!thoughts) {
            return res.status(404).json({ message: 'No thoughts with that ID' });
        }

        res.json(thoughts);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createThoughts(req, res) {
        try {
        const thoughts = await Thoughts.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thoughts._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
            message: 'thoughts created, but found no user with that ID',
            })
        }

        res.json('Created the thought 🎉');
        } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    async updateThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThoughts(req, res) {
        try {

            const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtsId },
                { $pull: { thoughts: req.params.thoughtsId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                message: 'thoughts created but no user with this id!',
                });
            }

            res.json({ message: 'thoughts successfully deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
        const thoughts = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );

        if (!thoughts) {
            return res.status(404).json({
            message: 'reaction created, but found no thought with that ID',
            })
        }


        res.json({ message: 'reaction successfully created!' });
    } catch (err) {
    res.status(500).json(err);
    }},

    async deleteReactions(req, res) {
        try {

        const thoughts = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: {
                _id: req.params.reactionId
            }}},
            { new: true }
        );

        console.log(thoughts);

        if (!thoughts) {
            return res.status(404).json({
            message: 'reaction created but no user with this id!',
            });
        }

        res.json({ message: 'reaction successfully deleted!' });
        } catch (err) {
        res.status(500).json(err);
        }
    }

}