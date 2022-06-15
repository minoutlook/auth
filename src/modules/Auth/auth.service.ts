import customError from '../../utils/error'
import { Admin } from '../Admins/admin.schema'
import { isAdminByUsername } from '../Admins/admin.service'
import { comparePassword, generateVerionsToken } from '../Core/function'
import { createAccessToken } from './accessToken'

const authMessage = {
  // SUCCESS
  loguotSuccess: { code: '0', result: 'ออกจากระบบสำเร็จ' },
  // Error
  isDeleted: { message: 'แอดมิน ถูกลบไปแล้ว', code: '405' },
  isLoginNew: { message: 'กรุณา ล๊อกอินใหม่', code: '407' },
}

//    FUNCTION      LOGIN
const login = async (username: string, password: string) => {
  try {
    const versionToken = generateVerionsToken()
    const isAdmin = await Admin.findOne({ username, isActive: true }).lean()
    comparePassword(password, isAdmin.password)
    await isAdminByUsername(username)
    await Admin.updateOne({ _id: isAdmin._id }, { versionToken })
    return createAccessToken({ id: isAdmin._id, username: isAdmin.username, versionToken })
  } catch (e) {
    return customError(e)
  }
}

//    FUNCTION     LOGOUT
const logout = async (id: string) => {
  try {
    await Admin.updateOne({ _id: id }, { versionToken: 0 })
    return authMessage.loguotSuccess
  } catch (e) {
    return customError(e)
  }
}

//    FUNCTION     VALIDATE TOKEN
export const validateToken = async (id: string, versionToken: number) => {
  try {
    const isAdmin = await Admin.findById(id)
    if (isAdmin.versionToken !== versionToken) return customError(authMessage.isLoginNew)
    return true
  } catch (e) {
    return customError(e)
  }
}

export default {
  login,
  logout,
  validateToken,
}
