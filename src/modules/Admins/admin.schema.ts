import { model, Schema } from 'mongoose'

const collection = 'Admin'
const schema = new Schema<AdminInterface>(
  {
    fullname: {
      type: String,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    permissions: Array,
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    versionToken: {
      type: Number,
      default: 0,
    },
  },
  {
    collection,
    versionKey: false,
  }
)

export const Admin = model(collection, schema)

export interface AdminInterface {
  fullname: string
  username: string
  password: string
  permissions?: string[]
  isActive?: boolean
  isDeleted?: boolean
  versionToken?: number
}
