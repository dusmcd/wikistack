const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const viewMethods = require('../views/index');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(viewMethods.main(pages));
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(viewMethods.addPage());
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        name: req.body.authorName,
      },
    });
    if (!user) {
      user = new User({
        name: req.body.authorName,
        email: req.body.email,
      });
    }
    await user.save();
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    await page.save();
    await page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug;
  try {
    const page = await Page.findAll({
      where: {
        slug: slug,
      },
    });
    res.send(viewMethods.wikiPage(page[0]));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
