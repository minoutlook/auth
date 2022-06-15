import customError from '../../utils/error'

import { Admin, AdminInterface } from './admin.schema'
import { adminData } from './admin.data'
import { comparePassword, generateVerionsToken, getPageSize, hashPassword } from '../Core/function'

const Message = {
  // SUCCESS
  createSuccess: { code: '0', result: 'สร้างแอดมินสำเร็จ' },
  updateSuccess: { code: '0', result: 'อัพเดตแอดมินสำเร็จ' },
  deleteSuccess: { code: '0', result: 'ลบแอดมินสำเร็จ' },
  loguotSuccess: { code: '0', result: 'ออกจากระบบสำเร็จ' },
  success: (result: any) => {
    return { code: '0', result }
  },
  // Error
  isPasswordCorrect: { message: 'รหัสผ่านไม่ถูกต้อง', code: '102' },
  isAlready: { message: 'Username มีอยู่ในระบบแล้ว ', code: '103' },
  notFound: { message: 'ไม่พบ แอดมิน ในระบบ', code: '104' },
  isDeleted: { message: 'แอดมิน ถูกลบไปแล้ว', code: '105' },
}

// CRUD
const create = async (doc: AdminInterface) => {
  try {
    doc.password = hashPassword(doc.password)
    const isAdmin = await Admin.findOne({ username: doc.username })
    if (isAdmin) return customError(Message.isAlready)
    await Admin.create(doc)
    return Message.createSuccess
  } catch (e) {
    return customError(e)
  }
}

const find = async (data: any = {}) => {
  try {
    const { limit, skip } = getPageSize(data)
    const result = await Admin.find({ ...data, isDeleted: false })
      .select('-password')
      .limit(limit)
      .skip(skip)
      .lean()
    return Message.success(result)
  } catch (e) {
    return customError(e)
  }
}

const findById = async (id: string) => {
  try {
    await isAdminById(id)
    const isAdmin = await Admin.findById(id).select('-password')
    return Message.success(isAdmin)
  } catch (e) {
    return customError(e)
  }
}

const updateById = async (id: string, doc: AdminInterface) => {
  try {
    if (doc.username) delete doc.username
    await isAdminById(id)
    await Admin.findByIdAndUpdate(id, doc, { new: true })
    return Message.updateSuccess
  } catch (e) {
    return customError(e)
  }
}

const deleteById = async (id: string) => {
  try {
    await isAdminById(id)
    await Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return Message.deleteSuccess
  } catch (e) {
    return customError(e)
  }
}

// GET     DEFAULT
const getDefault = async () => {
  try {
    const result = adminData.map(async (admin) => await create(admin))
    const resultAll = await Promise.allSettled(result)
    return resultAll
  } catch (e) {
    return customError(e)
  }
}

//
//    FUNCTION  ADMIN
//

//    FUNCTION      CHECK ADMIN BY ID
export const isAdminById = async (id: string) => {
  try {
    const { isDeleted } = await Admin.findById(id).lean()
    if (isDeleted == true) return customError(Message.isDeleted)
    return true
  } catch (e) {
    e.code == Message.isDeleted.code ? customError(e) : customError(Message.notFound)
    return customError(e)
  }
}

//   FUNCTION      CHECK ADMIN BY USERNAME
export const isAdminByUsername = async (username: string) => {
  try {
    const { isDeleted } = await Admin.findOne({ username }).lean()
    if (isDeleted == true) return customError(Message.isDeleted)
    return true
  } catch (e) {
    e.code == Message.isDeleted.code ? customError(e) : customError(Message.notFound)
    return customError(e)
  }
}

export default {
  create,
  find,
  findById,
  updateById,
  deleteById,
  getDefault,
  generateVerionsToken,
}
