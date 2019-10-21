import { Document, model, Model, Schema, Types } from 'mongoose';
import { IUserDocument } from './user';

interface IPostDocument extends Document {
  title: string;
  content: string;
  user: IUserDocument;
}

interface IPostModel extends Model<IPostDocument> {}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const isPost = (post: IPostModel | any): post is IPostModel => {
  return post && post.title !== undefined && post.content !== undefined;
};

export { IPostDocument, IPostModel, isPost };

const Post: IPostModel = model<IPostDocument, IPostModel>('Post', PostSchema);

export default Post;
