const express = require('express');

const tourController = require('../controllers/tourController');
// const { get } = require('mongoose');
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = tourController;
const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
