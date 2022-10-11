const express = require('express');
const income = require('../model/income');
const router = express.Router();
const dateTimeHelper = require('../helper/date_time_helper');

router.get('/', async (req, res) => {
  const result = await income.find();
  const incomeList = []
  result.map((value) => {
    const dateTime = dateTimeHelper.getDate(value['date']);
    incomeList.push({
      _id: value['_id'],
      description: value['description'],
      income: value['income'],
      date: value['date'],
      month: dateTime.month,
      year: dateTime.year,
    })
  });
  res.json(incomeList);
});

router.get('/:id', async (req, res) => {
  const result = await income.findById(req.body._id);
  return res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const result = income(payload);
  await result.save();
  res.status(201).json({
    success: true,
    msg: 'add income successfully.',
  });
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
