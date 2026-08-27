import { env } from "bun"
import mongoose from "mongoose"

const { Schema, model } = mongoose

export const db_client = await mongoose.connect(String(env.MONGO_URI))

interface IUrl {
  alias: string
  original_url: string
  created_at: Date
}

const url = new Schema<IUrl>({
  alias: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  original_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
})

export const UrlsModel = model<IUrl>("Urls", url)
