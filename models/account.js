import {Schema, model, models} from "mongoose";

const AccountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
        type: String,
    },
    provider: {
        type: String,
    },
    providerAccountId: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    access_token: {
        type: String,
    },
});

const Account = models.Account || model("Account", AccountSchema);

export default Account;
