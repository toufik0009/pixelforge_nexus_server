import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  let projects;

  if (req.user) {
    projects = await Project.find({ members: req.user.id });
  } else {
    projects = await Project.find();
  }

  res.json(projects);
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};