const Projects = require("./helpers/projectModel");
const Actions = require("./helpers/actionModel");

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Name and description are required!" });
  } else {
    next();
  }
}

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Project id does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There is an error"
      });
    });
}

function validateAction(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body.notes || !req.body.description) {
    res.status(400).json({ message: "Notes and description are required!" });
  } else {
    next();
  }
}

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(404).json({ message: "Action does not exist." });
      } else {
        req.action = action;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There is an error"
      });
    });
}

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId
};
