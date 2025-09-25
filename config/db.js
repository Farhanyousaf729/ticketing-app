import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn; // reuse existing connection
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const dburi = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_URI_PROD
    cached.promise = mongoose
      .connect(dburi, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
