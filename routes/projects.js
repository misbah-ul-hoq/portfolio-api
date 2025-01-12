import e from "express";
import { validateToken } from "../auth/auth.js";
import { Project } from "../models/project.js";
const projects = e.Router();

projects.get("/", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

projects.get("/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).send({ message: "Project not found" });
  res.send(project);
});

projects.post("/", validateToken, async (req, res) => {
  const project = await new Project(req.body).save();
  res.send(project);
});

projects.put("/:slug", validateToken, async (req, res) => {
  const foundProject = await Project.findOne({ slug: req.params.slug });
  if (!foundProject)
    return res.status(404).send({ message: "Project not found" });
  const updatedProject = await Project.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  res.send(updatedProject);
});

projects.delete("/:slug", validateToken, async (req, res) => {
  const foundProject = await Project.findOne({ slug: req.params.slug });
  if (!foundProject)
    return res.status(404).send({ message: "Project not found" });
  const deletedProject = await Project.deleteOne({ slug: req.params.slug });
  res.send(deletedProject);
});

export default projects;
