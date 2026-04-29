import {Schema, model, models} from "mongoose";

const ServiceSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    nameEn: {
        type: String,
        required: [true, 'Name is required!'],
    },
    nameRo: {
        type: String,
    },
    nameRu: {
        type: String,
    },
    questions: {
        type: String,
    },
    time: {
        type: String,
    },
    place: {
        type: String,
    },


});

const Service = models.Service || model("Service", ServiceSchema);

export default Service;
