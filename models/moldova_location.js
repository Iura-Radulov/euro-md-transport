import {Schema, model, models} from "mongoose";

const MoldovaLocationSchema = new Schema({
    nameEn: {
        type: String,
        required: [true, 'Name is required!'],
    },
    nameRu: {
        type: String,
    },
    nameRo: {
        type: String,
    },
});

const MoldovaLocation = models.MoldovaLocation || model("MoldovaLocation", MoldovaLocationSchema);

export default MoldovaLocation;
