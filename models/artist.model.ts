import mongoose, { Schema, Document } from "mongoose";

export interface ISong {
  title: string;
  length: string;
}

export interface IAlbum {
  title: string;
  description: string;
  songs: ISong[];
}

export interface IArtist extends Document {
  name: string;
  albums: IAlbum[];
}

const SongSchema = new Schema({
  title: { type: String, required: true },
  length: { type: String, required: true },
});

const AlbumSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  songs: [SongSchema],
});

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  albums: [AlbumSchema],
});

export default mongoose.model<IArtist>("Artist", ArtistSchema);
