const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validator: {
      // if username is taken, throw error
      isUnique: async (value) => {
        const username = await User.findOne({ where: { username: value } });
        if (username) {
          throw new Error('Username already in use!');
        }
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  location: {
    type: Sequelize.STRING,
  },
  skill_level: {
    type: Sequelize.STRING,
  },
  img_url: {
    type: Sequelize.TEXT,
    defaultValue: 'default_user.jpg'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about_me: {
    type: Sequelize.TEXT,
  },
  ban_status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'good_standing',
    validate: {
      customValidator: (value) => {
        const enums = ['good_standing', 'in_review', 'banned']
        if (!enums.includes(value)) {
          throw new Error('not a valid option')
        }
      }
    }

  },
  is_banned: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } })
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};


//if username is taken, throw error
User.beforeCreate(async (user) => {
  const username = await User.findOne({ where: { username: user.username } });
  if (username) {
    throw new Error('Username already in use!');
  }
})

//if email is taken, throw error
User.beforeCreate(async (user) => {
  const email = await User.findOne({ where: { email: user.email } });
  if (email) {
    throw new Error('Email already in use!');
  }
})

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
