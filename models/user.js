import {Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Username is required!'],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
    },
    account: {
        type: String,
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    about: {
        type: String,
    },
    phone: {
        type: String,
    },
    birthday: {
        type: String,
    },
    experience: {
        type: String,
    },
    emailVerified: {
        type: Date,
    }
});

const User = models.User || model("User", UserSchema);

export default User;
