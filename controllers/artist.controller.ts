import { Request, Response } from "express";
import Artist, { IArtist } from "../models/artist.model";

// GET all artists
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET one artist by ID
export const getArtistById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new artist
export const createArtist = async (req: Request, res: Response) => {
  const { name, albums } = req.body;
  const newArtist: IArtist = new Artist({
    name,
    albums,
  });
  try {
    const savedArtist = await newArtist.save();
    res.status(201).json(savedArtist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update an artist by ID
export const updateArtistById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, albums } = req.body;
  try {
    const artist = await Artist.findByIdAndUpdate(
      id,
      { name, albums },
      { new: true }
    );
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json(artist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an artist by ID
export const deleteArtistById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedArtist = await Artist.findByIdAndDelete(id);
    if (!deletedArtist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.json({ message: "Artist deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
