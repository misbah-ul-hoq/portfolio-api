import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  slug: { type: String, required: true },
  thumbnail: { type: String, required: true },
  liveUrl: { type: String, required: true },
  html: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export { Project };
