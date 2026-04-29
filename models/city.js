import {Schema, model, models} from "mongoose";

const CitySchema = new Schema({
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

const City = models.City || model("City", CitySchema);

export default City;
