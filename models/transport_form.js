import {Schema, model, models} from "mongoose";

const TransportFormSchema = new Schema({
    fromDestination: {
        type: String,
        required: [true, 'From is required!'],
    },
    toDestination: {
        type: String,
        required: [true, 'To is required!'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required!'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'new'

    }
});

const TransportForm = models.TransportForm || model("TransportForm", TransportFormSchema);

export default TransportForm;
