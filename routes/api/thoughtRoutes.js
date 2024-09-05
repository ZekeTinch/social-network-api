const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReactions
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);


router
    .route('/:thoughtsId')
    .get(getSingleThoughts)
    .put(updateThoughts)
    .delete(deleteThoughts);

router.route('/:thoughtsId/reactions')
    .post(createReaction);

router.route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReactions);

module.exports = router;
