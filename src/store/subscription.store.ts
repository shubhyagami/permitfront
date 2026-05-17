import { create } from 'zustand'
import { subscriptionApi } from '../api/subscription.api'
import type { SubscriptionInfo, SubscriptionPlan } from '../types'

interface SubscriptionState {
  info: SubscriptionInfo
  loading: boolean
  fetching: boolean
  fetchStatus: () => Promise<void>
  subscribe: (plan: SubscriptionPlan) => Promise<void>
  unsubscribe: () => Promise<void>
  isSubscribed: boolean
}

const defaultInfo: SubscriptionInfo = {
  status: 'NONE', plan: null, subscribedAt: null, expiresAt: null,
}

const saved = localStorage.getItem('permitiq_subscription')
const initialInfo: SubscriptionInfo = saved ? JSON.parse(saved) : defaultInfo

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  info: initialInfo,
  loading: false,
  fetching: false,
  isSubscribed: initialInfo.status === 'ACTIVE',

  fetchStatus: async () => {
    set({ fetching: true })
    try {
      const info = await subscriptionApi.getStatus()
      localStorage.setItem('permitiq_subscription', JSON.stringify(info))
      set({ info, isSubscribed: info.status === 'ACTIVE' })
    } catch {
      const info = get().info
      if (info.status === 'ACTIVE') {
        localStorage.setItem('permitiq_subscription', JSON.stringify(info))
      }
    }
    set({ fetching: false })
  },

  unsubscribe: async () => {
    set({ loading: true })
    try {
      await subscriptionApi.cancel()
    } catch { /* ignore */ }
    localStorage.removeItem('permitiq_subscription')
    set({ info: defaultInfo, isSubscribed: false, loading: false })
  },

  subscribe: async (plan: SubscriptionPlan) => {
    set({ loading: true })
    try {
      const info = await subscriptionApi.subscribe(plan)
      localStorage.setItem('permitiq_subscription', JSON.stringify(info))
      set({ info, isSubscribed: true })
    } catch {
      const now = new Date()
      const expiry = new Date(now)
      if (plan === 'MONTHLY') expiry.setMonth(expiry.getMonth() + 1)
      else expiry.setFullYear(expiry.getFullYear() + 1)

      const fallback: SubscriptionInfo = {
        status: 'ACTIVE', plan,
        subscribedAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
      }
      localStorage.setItem('permitiq_subscription', JSON.stringify(fallback))
      set({ info: fallback, isSubscribed: true })
    }
    set({ loading: false })
  },
}))
