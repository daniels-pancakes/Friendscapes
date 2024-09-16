const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/appController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId
router
  .route('/:applicationId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
