'use strict';
const bcrypt = require('bcryptjs')
const {buildError} = require('../../utils/buildError.js');
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toSafeObject() {
      const {id, username, email, firstName, lastName} = this; //!context of User instance.
      return {id, username, email, firstName, lastName };
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }

    static async login({credential, password}){
      const { Op } = require('sequelize');
      console.log(credential, password)
      const user = await User.scope('loginUser').findOne({
        where:{
          [Op.or] : {
            username: credential,
            email: credential
          }
        }
      });
      
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({email, password, username}){
      const {Op} = require('sequelize');
      const hashedPassword = bcrypt.hashSync(password);
      const checkUnique = await User.scope('loginUser').findAll({
        where:{
          [Op.or]:[
            {email: email},
            {username: username}
          ]
        }
      });

      if(checkUnique){
        for(let i = 0; i < checkUnique.length; i++){
          const user = checkUnique[i];
          if(email === user.dataValues.email){
            const err = buildError('There is already an account registered with that email', 'Email already registered', 403);
            return err
          }
          if(username === user.dataValues.username){
            const err = buildError('There is already an account registered with that username', 'username already registered', 403);
            return err``
          }
        }
      }

      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes:{
      currentUser: {
        attributes: {exclude: ['hashedPassword']}
      },
      loginUser:{
        attributes:{}
      }
    }
  });
  return User;
};
