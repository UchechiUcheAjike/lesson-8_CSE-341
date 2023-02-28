const express = require('express');
const router = express.Router();

const jobsController = require('../controllers/jobs');
const validation = require('../middleware/validate');

// eslint-disable-next-line no-undef
router.get('/', jobsController.getAll);

// eslint-disable-next-line no-undef
router.get('/:id', jobsController.getSingle);

// eslint-disable-next-line no-undef
router.post('/', validation.saveJob, jobsController.createJob);

// eslint-disable-next-line no-undef
router.put('/:id', validation.saveJob, jobsController.updateJob);

// eslint-disable-next-line no-undef
router.delete('/:id', jobsController.deleteJob);

module.exports = router;