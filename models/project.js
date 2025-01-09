import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  html: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export { Project };
