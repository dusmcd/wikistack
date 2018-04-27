const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const viewMethods = require('../views/index');

router.get('/', async (req, res, next) => {
  try {
  const pages = await Page.findAll();
  res.send(viewMethods.main(pages));
  } catch (error) {next(error)}
});

router.get('/add', (req, res, next) => {
  try {
    res.send(viewMethods.addPage());
  } catch (error) {next(error)}
});

router.post('/', async (req, res, next) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  console.log('title', postTitle, 'content', postContent)
  try {
    await Page.create({
      title: postTitle,
      content: postContent,
    })
    res.redirect('/');
  } catch(error) {next(error)}

});

module.exports = router;
