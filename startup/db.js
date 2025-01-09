import mongoose from "mongoose";

export function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));

  const db = mongoose.connection; // alias for the mongoose connection
  db.on("connected", () => console.log(`Connected to ${db.name} database`));
}
