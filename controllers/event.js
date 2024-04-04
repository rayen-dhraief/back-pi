import mongoose from 'mongoose';
import User from "../models/User.js";
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { titre, description, dateDebut, dateFin, participants } = req.body;
    const newEvent = new Event({
      titre,
      description,
      dateDebut,
      dateFin,
      participants,
    });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    console.log("error",err);
   // res.status(400).json({ message: err.message });
  
  }
};
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const updateEvent = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['titre', 'description', 'dateDebut', 'dateFin', 'lieu', 'organisateur', 'participants'];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};
