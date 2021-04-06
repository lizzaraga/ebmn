export interface ILogin{
  email?: string,
  password?: string,
}

export interface IUser{
  username?: string,
  email?: string,
  token?: string,
  job?: string,
  id?: number
}

export interface IRegister{
  username?: string,
  email?: string,
  password?: string,
  phone_number?: string
}