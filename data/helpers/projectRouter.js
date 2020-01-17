const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");

const {
  validateProject,
  validateProjectId,
  validateAction
} = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projectList => {
      const projectActionsPromise = projectList.map(project =>
        Projects.getProjectActions(project.id)
      );
      Promise.all(projectActionsPromise).then(projectActions => {
        const projectsWithActions = projectList.map((project, i) => ({
          ...project,
          actions: projectActions[i]
        }));
        res.status(200).json(projectsWithActions);
      });
    })
    .catch(err => {
      res.status(500).json({
        messgae: "There is an error retrieving projects and its actions"
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "There is an error adding this project"
      });
    });
});

router.post("/:id/actions", [validateProjectId, validateAction], (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  Actions.insert(actionInfo)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There is an error adding this action to the project"});
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "Your request could not be processed. " + err.message
      });
    });
});

router.put("/:id", [validateProjectId, validateProject], (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error updating this project"
      });
    });
});

module.exports = router;
