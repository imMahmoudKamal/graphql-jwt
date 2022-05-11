import { DataSource } from 'apollo-datasource';
import User from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

export class userDataSource extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  async create({ input }) {
    try {
      // check if user exists
      const isUserExist = await User.findOne({ email: input.email });
      if (isUserExist) throw new Error('user exists');

      // create new user
      const newUser = await new User({ email: input.email, hashedPassword: input.password });

      // save user to db
      const savedUser = await newUser.save();
      if (!savedUser) throw new Error('Error while saving user please try again');

      // sign token
      const accessToken = signToken({ sub: savedUser._id, email: savedUser.email });

      const returnUser = savedUser.toObject();
      returnUser.token = accessToken;

      return returnUser;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const allUsers = await User.find({});

      return allUsers;
    } catch (error) {
      return error;
    }
  }

  async getUser(email) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User is not exist!');

      return user;
    } catch (error) {
      return error;
    }
  }

  async logIn({ input }) {
    try {
      // check if user exists
      const user = await User.findOne({ email: input.email });
      if (!user) throw new Error('Wrong credentials');

      // check password
      const matchedPassword = await user.comparePassword(input.password);
      if (!matchedPassword) throw new Error('Wrong credentials');

      // sign token
      const accessToken = signToken({ sub: user._id, email: user.email });

      const returnUser = user.toObject();
      returnUser.token = accessToken;

      return returnUser;
    } catch (error) {
      return error;
    }
  }
}
