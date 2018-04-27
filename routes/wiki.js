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
  const postTitle = req.body.title;
  const postContent = req.body.content;
  const status = req.body.status;
  console.log('postTitle', postTitle, "postContent", postContent, 'status', status)
  let user = await User.findOne({
    where: {name: req.body.authorName
    }
  });
  if (!user) {
    console.log('username', req.body.authorName, 'email', req.body.email)
    user = new User({
      name: req.body.authorName,
      email: req.body.email
    })
  }
  await user.save();
  const page = new Page({
    title: postTitle,
    content: postContent,
    status: status,
  });


  try {
    await page.save();
    await page.setAuthor(user)
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
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
