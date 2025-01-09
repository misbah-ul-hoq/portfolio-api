import e from "express";
import { validateToken } from "../auth/auth.js";
import { Project } from "../models/project.js";
const projects = e.Router();

projects.get("/", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

projects.post("/", validateToken, async (req, res) => {
  const project = await new Project(req.body).save();
  res.send(project);
});

projects.put("/", (req, res) => {
  res.send("hello");
});

projects.delete("/", (req, res) => {
  res.send("hello");
});

export default projects;
