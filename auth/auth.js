import dotenv from "dotenv";
dotenv.config();
const validateToken = (req, res, next) => {
  const token = req.headers.dashboardtoken;
  if (token === process.env.DASHBOARD_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { validateToken };
