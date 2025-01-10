import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const MONGODB_URL = "mongodb+srv://pranavmolawade123:pranavmolawade@cluster0.roib4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URL environment variable inside .env.local"
    );
}

const cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
    conn: null,
    promise: null,
};

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

export default dbConnect;
