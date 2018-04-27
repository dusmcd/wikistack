const express = require('express');
const router = express.Router();
const { User, Page } = require('../models/index');
const viewMethods = require('../views/index');

router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.send(viewMethods.userList(users));
});

router.get('/:id', async (req, res, next) => {
  try {
    const userPages = await Page.findAll({
      where: {
        authorId: req.params.id,
      },
    });
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(viewMethods.userPages(user, userPages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
