const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Harry Potter',
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'Avada Kedavra',
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

function createSlug(title) {
  const slug = title.replace(/\s/, '-')
  return slug
}

Page.beforeValidate((pageInstance, options) => {
  const slug = createSlug(pageInstance.title)
  pageInstance.slug = slug;
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Page, User };
