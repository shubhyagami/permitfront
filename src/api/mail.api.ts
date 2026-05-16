import api from './client'
import type { MailResult } from '../types'

export const mailApi = {
  sendReminders: () =>
    api.post<MailResult>('/mail/send-reminders').then(r => r.data),

  sendExpiryNotification: (documentId: number) =>
    api.post<MailResult>(`/mail/send-expiry-notification?documentId=${documentId}`).then(r => r.data),

  sendUploadNotification: (documentId: number) =>
    api.post<MailResult>(`/mail/send-upload-notification?documentId=${documentId}`).then(r => r.data),
}
