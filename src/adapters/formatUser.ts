import { User, UserResponse } from '@/types'

export const formatUser = (userResponse: UserResponse) => {
  const { data } = userResponse
  const formatedUser: User = {
    id: data.userId,
    username: data.username,
    names: data.names,
    lastnames: data.lastnames,
    email: data.email,
    phone: data.phone,
    type: data.type,
    state: data.state,
    password: data.password,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }

  return formatedUser
}
