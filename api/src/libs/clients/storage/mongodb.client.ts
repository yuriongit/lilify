import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Environment vars indexes
const MONGO_URI = "MONGO_URI"

export const db_client = await mongoose.connect(String(process.env[MONGO_URI]));

interface IUrl {
    short_id: string
    original_url: string
    created_at: Date
}

const url = new Schema<IUrl>({
    short_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    original_url: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

export const UrlsModel = model<IUrl>("Urls", url);
