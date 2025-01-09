import projects from "../routes/projects.js";

export function routes(app) {
  app.use("/api/projects", projects);
}

export default routes;
