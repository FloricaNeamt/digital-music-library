"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArtistById = exports.updateArtistById = exports.createArtist = exports.getArtistById = exports.getAllArtists = void 0;
const artist_model_1 = __importDefault(require("../models/artist.model"));
// GET all artists
const getAllArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield artist_model_1.default.find();
        res.json(artists);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllArtists = getAllArtists;
// GET one artist by ID
const getArtistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const artist = yield artist_model_1.default.findById(id);
        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.json(artist);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getArtistById = getArtistById;
// POST create a new artist
const createArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, albums } = req.body;
    const newArtist = new artist_model_1.default({
        name,
        albums,
    });
    try {
        const savedArtist = yield newArtist.save();
        res.status(201).json(savedArtist);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createArtist = createArtist;
// PUT update an artist by ID
const updateArtistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, albums } = req.body;
    try {
        const artist = yield artist_model_1.default.findByIdAndUpdate(id, { name, albums }, { new: true });
        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.json(artist);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateArtistById = updateArtistById;
// DELETE an artist by ID
const deleteArtistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedArtist = yield artist_model_1.default.findByIdAndDelete(id);
        if (!deletedArtist) {
            return res.status(404).json({ message: "Artist not found" });
        }
        res.json({ message: "Artist deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteArtistById = deleteArtistById;
