const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const viewMethods = require('../views/index');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(viewMethods.main(pages));
});

router.get('/add', (req, res, next) => {
  res.send(viewMethods.addPage());
});

router.post('/', (req, res, next) => {
  // add to db based on form input
});

module.exports = router;
