import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("DB is already Connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'nextblog',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log("DB is Connected")
    } catch (error) {
        console.log(error)
    }
}