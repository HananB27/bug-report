import Bug from "../models/Bug.model.js";
import { ROLES } from "../constants.js";

export const getAllBugs = async (req, res) => {
  const { role, id } = req.user;
  //assignedTo - developer
  //reportedBy - qa
  try {
    let bugs = [];
    if (role === ROLES.QA) {
      bugs = await Bug.find({ reportedBy: id });
    } else {
      bugs = await Bug.find({ assignedTo: id });
    }
    res.status(200).send(bugs);
  } catch (e) {
    res.status(500).send("Error finding bug");
  }
};

export const createBug = async (req, res) => {
  const bug = new Bug(req.body);

  try {
    const result = await bug.save();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Could not create bug");
  }
};

export const changeCompletedStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const result = await Bug.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Could not change status");
  }
};

