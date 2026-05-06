import {Schema, model, models} from "mongoose";

const ContactFormSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required!'],
    },
    message: {
        type: String,
        required: [true, 'Message is required!'],
    },

    status: {
        type: String,
        default: 'new'

    }
}, { timestamps: true });

const ContactForm = models.ContactForm || model("ContactForm", ContactFormSchema);

export default ContactForm;
