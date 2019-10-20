import mongoose from 'mongoose';

import User from '../models/user';

abstract class Database {
  public static async connect(uri: string) {
    return mongoose.connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public static async disconnect() {
    return mongoose.disconnect();
  }

  public static async initialize() {
    const username = process.env.SUPER_USER_USERNAME!;
    const password = process.env.SUPER_USER_PASSWORD!;
    const email = process.env.SUPER_USER_EMAIL!;
    const user = await User.findOne({ username });
    if (!user) {
      const encryptedPassword = await User.encryptPassword(password);
      await new User({ username, password: encryptedPassword, email }).save();
    } else {
      user.password = await User.encryptPassword(password);
      user.email = email;
      await user.save();
    }
  }
}

export default Database;
