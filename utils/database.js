import mongoose from "mongoose";

// Use a global variable to cache the connection across lambda invocations (serverless)
const globalAny = globalThis;

if (!globalAny._mongo) {
  globalAny._mongo = { conn: null, promise: null };
}

export async function connectToDB() {
  mongoose.set('strictQuery', true);

  if (globalAny._mongo.conn) {
    // already connected
    return globalAny._mongo.conn;
  }

  if (!globalAny._mongo.promise) {
    const uri = process.env.MONGODB2_MONGODB_URI || process.env.MONGODB_URI;
    if (!uri) {
      const err = new Error('Please define the MONGODB2_MONGODB_URI or MONGODB_URI environment variable inside Vercel/Environment');
      console.error(err.message);
      throw err;
    }

    const options = {
      // these options are safe defaults for modern mongoose
      dbName: process.env.MONGODB_DBNAME || 'euro_md_transport',
      // useNewUrlParser and useUnifiedTopology are defaults in modern mongoose but set explicitly for clarity
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // reduce the timeouts a bit; you can tune these in production if necessary
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    globalAny._mongo.promise = mongoose.connect(uri, options).then((conn) => {
      console.log('Mongodb connected');
      return conn;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      // reset promise so next attempt can retry
      globalAny._mongo.promise = null;
      throw err;
    });
  }

  globalAny._mongo.conn = await globalAny._mongo.promise;
  return globalAny._mongo.conn;
}

export default connectToDB;
