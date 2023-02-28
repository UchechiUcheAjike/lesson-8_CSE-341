const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('jobs')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({
          message: err
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid job id to find a job.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('jobs')
    .find({
      _id: userId
    })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({
          message: err
        });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createJob = async (req, res) => {
  const job = {
    status: req.body.status,
    company: req.body.company,
    title: req.body.title,
    position: req.body.position,
    level: req.body.level,
    YearsOfExperience: req.body.YearsOfExperience,
    createdAt: req.body.createdAt
  };
  const response = await mongodb.getDb().db().collection('jobs').insertOne(job);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the job.');
  }
};

const updateJob = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid job id to update a job.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const job = {
    status: req.body.status,
    company: req.body.company,
    title: req.body.title,
    position: req.body.position,
    level: req.body.level,
    YearsOfExperience: req.body.YearsOfExperience,
    createdAt: req.body.createdAt
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('jobs')
    .replaceOne({
      _id: userId
    }, job);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the job.');
  }
};

const deleteJob = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid job id to delete a job.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('jobs').remove({
    _id: userId
  }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the job.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createJob,
  updateJob,
  deleteJob
};