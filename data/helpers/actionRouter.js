const express = require("express");
const { get, insert, update, remove } = require("./actionModel");
const { validateAction, validateActionId } = require("../middleware");

const router = express.Router();

router.get("/", (req, res) => {
  get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error retrieving all actions"
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.delete("/:id", validateActionId, (req, res) => {
  remove(req.params.id)
    .then(actionToRemove => {
      res.status(200).json(actionToRemove);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error deleting this action"
      });
    });
});

router.put("/:id", [validateActionId, validateAction], (req, res) => {
  update(req.params.id, req.body)
    .then(actionToUpdate => {
      res.status(200).json(actionToUpdate);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error updating this action"
      });
    });
});

module.exports = router;
