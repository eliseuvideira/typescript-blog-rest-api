import { Document, model, Model, Schema } from 'mongoose';

import EncryptionHelper from '../helpers/encryption';

interface IUserDocument extends Document {
  username: string;
  password: string;
  email: string;
  verifyPassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
  encryptPassword: (password: string) => Promise<string>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

UserSchema.methods.verifyPassword = async function(password: string) {
  return EncryptionHelper.comparePassword(password, this.password);
};

UserSchema.statics.encryptPassword = EncryptionHelper.encryptPassword;

const isUser = (user: IUserModel | any): user is IUserModel => {
  return (
    user &&
    user.username !== undefined &&
    user.password !== undefined &&
    user.email !== undefined
  );
};

export { IUserDocument, IUserModel, isUser };

const User: IUserModel = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
