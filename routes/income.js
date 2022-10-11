const express = require('express');
const income = require('../model/income');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await income.find({});
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await income.findById(req.body._id);
  return res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const result = income(payload);
  await result.save();
  res.status(201).end();
});

router.patch('/', (req, res) => {
  income.findByIdAndUpdate(req.body._id, req.body, (err, income) => {
    return res.status(200).json({
      success: true,
      msg: 'update income successfully.',
    });
  });
});

router.delete('/', (req, res) => {
  income.findByIdAndDelete(req.body._id, (err, income) => {
    return res.status(204).json({
      success: true,
      msg: 'delete income successfully.',
    });
  });
});


module.exports = router;
