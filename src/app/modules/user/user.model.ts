import mongoose, { Schema } from "mongoose";
import { TUser, Users } from "./user.interface";
import bcrypt from "bcrypt"

const userSchema = new Schema<TUser, Users>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
}, {
    timestamps: true,
})


// user password hashing
userSchema.pre('save', async function(next) {
    // Hash the password before saving it to the database.
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.statics.isUserExists = async function (email: string) {
    const existingUser = await UserModel.findOne({ email });
    return existingUser;
  };


export const UserModel = mongoose.model<TUser, Users>('User', userSchema);