import mongoose from 'mongoose';

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
}

export default Database;
