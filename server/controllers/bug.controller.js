import Bug from "../models/Bug.model.js";
import User from "../models/User.model.js";
import {ROLES} from "../constants.js"

export const getAllBugs = async (req, res) => {
  const bugs = await Bug.find();

  res.status(200).send(bugs);
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
    const result = await Bug.findByIdAndUpdate(id, { completed }, {new: true});
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Could not change status");
  }
};

export const getBugsByUserId = async (req, res) => {
  const {userId} = req.params;
  //assignedTo - developer
  //reportedBy - qa
  try {
    const user = await User.findById(userId)
    console.log('user: ', user);
    let bugs = [];
    if (user.role===ROLES.QA) {
        bugs = await Bug.find({reportedBy: userId})
    } else {
        bugs = await Bug.find({assignedTo: userId})
    }
    res.status(200).send(bugs);
  } catch (e) {
    res.status(500).send("Error finding bug");
  }
};
