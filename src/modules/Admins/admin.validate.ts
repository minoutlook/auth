import { createYupSchema } from 'fastify-yup-schema'

export const test = createYupSchema((yup) => ({
  body: yup
    .object({
      id: yup.number().typeError('กรุณาระบุ ตัเลข').required('กรุณาใส่ id'),
    })
    .required(),
}))

export const create = createYupSchema((yup) => ({
  body: yup
    .object({
      fullname: yup.string().trim().required('กรุณาใส่ fullname'),
      username: yup.string().trim().required('กรุณาใส่ username'),
      password: yup.string().trim().required('กรุณาใส่ password'),
    })
    .required(),
}))

export const update = createYupSchema((yup) => ({
  body: yup
    .object({
      fullname: yup.string().trim(),
      password: yup.string().trim(),
    })
    .required(),
}))

export const login = createYupSchema((yup) => ({
  body: yup
    .object({
      username: yup.string().trim().required('กรุณาใส่ username'),
      password: yup.string().trim().required('กรุณาใส่ password'),
    })
    .required(),
}))

export const auth = createYupSchema((yup) => ({
  headers: yup
    .object({
      authorization: yup.string().required('กรุณาใส่ Token'),
    })
    .required(),
}))

export default {
  create,
  update,
  test,
  login,
  auth,
}
