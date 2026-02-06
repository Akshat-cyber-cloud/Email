import { type EmailId } from '@/shared/types/email'

export interface IUserStore {
  sub: string
  email: string
  picture: string
  firstName: string
  lastName: string
  emails: IUserEmails[]
  sentEmails: IUserEmails[]
}

export interface IUserEmails {
  id: EmailId
  firstName: string
  lastName: string
  fromEmail: Email
  toEmail: Email
  subject: string
  body: string
  hasViewed: boolean
  createdAt: string
}
