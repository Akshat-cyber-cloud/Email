import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import type { IUserStore, IUserEmails } from './types'
import type { ISendEmailData, EmailId, IEmail } from '@/shared/types/email'
import type { IGoogleLoginCallbackData } from '@/shared/types/google-login-callback'

export const useUserStore = defineStore('user', {
  state: (): IUserStore => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
    emails: [],
    sentEmails: []
  }),
  actions: {
    async sendEmail(data: ISendEmailData): Promise<void> {
      const newEmail: IUserEmails = {
        id: uuid() as EmailId,
        firstName: this.firstName,
        lastName: this.lastName,
        fromEmail: this.email,
        toEmail: data.toEmail,
        subject: data.subject,
        body: data.body,
        hasViewed: false,
        createdAt: moment().format('MMM D HH:mm')
      }

      // Add to sent emails
      this.sentEmails.unshift(newEmail)

      // If sent to self, add to inbox as well
      if (data.toEmail === this.email) {
        this.emails.unshift({
          ...newEmail,
          id: uuid() as EmailId // New ID for inbox copy
        })
      }
    },

    async getEmailsByEmailAddress(): Promise<void> {
      // Logic handled by persistence, no need to fetch
    },

    async getSentEmails(): Promise<void> {
      // Logic handled by persistence, no need to fetch
    },

    async getUserDetailsFromGoogle(data: IGoogleLoginCallbackData): Promise<void> {
      // Mock login - ignore the token
      this.sub = 'mock-sub-123'
      this.email = 'test@example.com'
      this.picture = 'https://via.placeholder.com/150'
      this.firstName = 'Test'
      this.lastName = 'User'
    },

    async deleteEmail(id: EmailId): Promise<void> {
      this.emails = this.emails.filter((e) => e.id !== id)
      this.sentEmails = this.sentEmails.filter((e) => e.id !== id)
    },

    async getEmailById(id: EmailId): Promise<IEmail | undefined> {
      const email = this.emails.find((e) => e.id === id) || this.sentEmails.find((e) => e.id === id)
      if (email) {
        return {
          id: email.id,
          body: email.body,
          createdAt: email.createdAt,
          firstName: email.firstName,
          fromEmail: email.fromEmail,
          lastName: email.lastName,
          subject: email.subject,
          toEmail: email.toEmail,
          hasViewed: email.hasViewed
        }
      }
      return undefined
    },

    async emailHasBeenViewed(id: EmailId): Promise<void> {
      const email = this.emails.find((e) => e.id === id)
      if (email) {
        email.hasViewed = true
      }
    },

    clearUser() {
      this.$state.sub = ''
      this.$state.email = ''
      this.$state.picture = ''
      this.$state.firstName = ''
      this.$state.lastName = ''
      this.$state.emails = []
      this.$state.sentEmails = []
    }
  },
  persist: true
})
