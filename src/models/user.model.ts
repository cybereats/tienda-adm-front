export interface User {
  id: number
  name: string
  surname?: string | null
  bornDate?: string | null
  username: string
  password?: string | null
}
