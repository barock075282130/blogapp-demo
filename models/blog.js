import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    info: {
        type: String,
        required: [true, "Blog info is required"],
    },
    dateTime: {
        type: String,
        default: '00/00/0000'
    }
});

const Blog = models.Blog || model('Blog',BlogSchema);

export default Blog;