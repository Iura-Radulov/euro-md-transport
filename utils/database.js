import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);
    if(isConnected) {
        console.log('MongoDb is already connected')
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB2_URI, {
            dbName: "euro_md_transport",
            // useNewUrlParser: true,
            // useUnifieldTopology: true
        })
        isConnected = true;
        console.log('Mongodb connected')

    }catch (e) {
        console.log(e)
    }
}
