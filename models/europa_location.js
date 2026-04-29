import {Schema, model, models} from "mongoose";

const EuropaLocationSchema = new Schema({
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

const EuropaLocation = models.EuropaLocation || model("EuropaLocation", EuropaLocationSchema);

export default EuropaLocation;
