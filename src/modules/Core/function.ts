import customError from '../../utils/error'
import * as bcrypt from 'bcrypt'
import moment from 'moment'

const Message = {
  // SUCCESS

  // Error
  isPasswordCorrect: { message: 'รหัสผ่านไม่ถูกต้อง', code: '99' },
}

//  FUNCTION      HASH PASSWORD
export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// FUNCTION      COMPARE PASSWORD
export function comparePassword(password: string, hashPassword: string) {
  const isPasswordCorrect = bcrypt.compareSync(password, hashPassword)
  if (!isPasswordCorrect) {
    return customError(Message.isPasswordCorrect)
  }
  return true
}

//    FUNCTION     RANDOM TOKEN
export function generateVerionsToken() {
  return Math.floor(Math.random() * 10000)
}

interface GetPageSize {
  page: number
  size: number
}
export function getPageSize(data: GetPageSize) {
  let { page, size } = data
  if (!page) page = 1
  if (!size) size = 10
  const limit = Number(size)
  const skip = (page - 1) * size
  return { limit, skip, page }
}

export function getDate(data: any) {
  let { startDate, endDate } = data
  if (!startDate) startDate = moment().format('YYYY-MM-DD 11:00:00')
  if (startDate) startDate = moment(startDate).format('YYYY-MM-DD 11:00:00')
  if (!endDate) endDate = moment().add(1, 'days').format('YYYY-MM-DD 11:00:00')
  if (endDate) endDate = moment(endDate).add(1, 'days').format('YYYY-MM-DD 11:00:00')
  let timeStampStart = moment(startDate).unix()
  let timeStampEnd = moment(endDate).unix()
  return { timeStampStart, timeStampEnd }
}
