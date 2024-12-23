import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
export default User;