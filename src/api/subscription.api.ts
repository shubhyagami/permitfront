import api from './client'
import type { SubscriptionInfo } from '../types'

export const subscriptionApi = {
  getStatus: () =>
    api.get<SubscriptionInfo>('/subscription').then(r => r.data),

  subscribe: (plan: 'MONTHLY' | 'YEARLY') =>
    api.post<SubscriptionInfo>('/subscription', { plan }).then(r => r.data),

  cancel: () =>
    api.delete('/subscription').then(r => r.data),
}
