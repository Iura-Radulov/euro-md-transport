import {Schema, model, models} from "mongoose";

const CategorySchema = new Schema({
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
    imagePath: {
        type: String,
    }
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
