import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {

    mongoose.set("strictQuery", false);
    if (initialized) {
        console.log("Mongoose already initialized");
        return;
    }

    try {
        await mongoose.connect(process.env.MONOGODB_URI, {
            dbName: 'movie-app'
        });
        initialized = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};