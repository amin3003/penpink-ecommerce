import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timeseries: true });

export default mongoose.model("Post", postSchema);