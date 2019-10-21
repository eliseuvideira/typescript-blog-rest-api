import Database from '../utils/database';

abstract class Fixture {
  public static async beforeAll() {
    const uri = process.env.MONGODB_URI! + '-test';
    await Database.connect(uri);
    await Database.initialize();
  }

  public static async afterAll() {
    await Database.disconnect();
  }
}

export default Fixture;
