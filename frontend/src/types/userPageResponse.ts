import { User } from "./user"

export type UserPageResponse = {
  pageItems: number
  totalItems: number
  pages: number
  data: User[]
}