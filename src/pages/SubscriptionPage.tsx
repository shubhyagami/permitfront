import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Crown, Check, Zap, Star, LogOut } from 'lucide-react'
import { useSubscriptionStore } from '../store/subscription.store'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { RetroButton } from '../components/ui/RetroButton'
import { BottomNav } from '../components/layout/BottomNav'
import toast from 'react-hot-toast'

const plans = [
  {
    id: 'MONTHLY' as const,
    name: 'Monthly',
    price: '₹99',
    period: '/month',
    icon: Zap,
    color: 'text-br-cyan',
    border: 'border-br-cyan/40',
    glow: 'blade-glow',
    features: [
      'Ad-free experience',
      'Priority support',
      'Unlimited document uploads',
      'Email reminders',
      'Basic analytics',
    ],
  },
  {
    id: 'YEARLY' as const,
    name: 'Yearly',
    price: '₹999',
    period: '/year',
    icon: Star,
    color: 'text-br-amber',
    border: 'border-br-amber/40',
    glow: 'blade-glow-amber',
    popular: true,
    features: [
      'Everything in Monthly',
      '2 months free (₹1188 value)',
      'Advanced analytics',
      'Custom report exports',
      'Priority email & chat support',
    ],
  },
]

export function SubscriptionPage() {
  const navigate = useNavigate()
  const { info, isSubscribed, loading, subscribe, unsubscribe } = useSubscriptionStore()
  const { fetchStatus } = useSubscriptionStore()

  useDocumentTitle('Subscription')

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleUnsubscribe = async () => {
    await unsubscribe()
    toast('Subscription cancelled. Ads will now appear.', {
      icon: '👋',
      style: { borderLeft: '4px solid #FFB000' },
    })
  }

  const handleSubscribe = async (plan: 'MONTHLY' | 'YEARLY') => {
    try {
      await subscribe(plan)
      toast.success('Welcome to Premium!', {
        style: { borderLeft: '4px solid #FFB000' },
      })
    } catch {
      toast.error('Subscription failed. Please try again.')
    }
  }

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-br-dark">
        <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
          <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="blade-card p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-br-amber/10 border-2 border-br-amber flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-br-amber" />
              </div>
              <h1 className="font-orbitron text-2xl text-white tracking-wider mb-2">
                You're a <span className="text-br-amber">Premium</span> Member
              </h1>
              <p className="font-worksans text-sm text-br-amber/60 mb-8">
                Enjoy an ad-free experience with all premium features.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                <div className="bg-br-dark border border-br-cyan/20 rounded-xl p-4">
                  <p className="font-space text-[10px] uppercase tracking-widest text-br-cyan/50 mb-1">Plan</p>
                  <p className="font-orbitron text-sm text-white">
                    {info.plan === 'YEARLY' ? 'Yearly' : 'Monthly'}
                  </p>
                </div>
                <div className="bg-br-dark border border-br-cyan/20 rounded-xl p-4">
                  <p className="font-space text-[10px] uppercase tracking-widest text-br-cyan/50 mb-1">Expires</p>
                  <p className="font-orbitron text-sm text-white">{formatDate(info.expiresAt)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {info.plan === 'MONTHLY' && (
                  <RetroButton variant="blade" onClick={() => handleSubscribe('YEARLY')}>
                    Upgrade to Yearly
                  </RetroButton>
                )}
                <RetroButton variant="outline" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </RetroButton>
              </div>

              <div className="mt-8 pt-6 border-t border-br-cyan/10">
                <RetroButton variant="red" onClick={handleUnsubscribe} loading={loading}>
                  <LogOut className="w-4 h-4" /> Unsubscribe
                </RetroButton>
                <p className="font-space text-[10px] text-white/30 mt-2">
                  Ads will reappear after unsubscribing
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <BottomNav expiringCount={0} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-br-dark">
      <div className="md:ml-64 pb-20 md:pb-8 pt-14 md:pt-0">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Crown className="w-12 h-12 text-br-amber mx-auto mb-4" />
            <h1 className="font-orbitron text-2xl text-white tracking-wider mb-2">
              Choose Your <span className="text-br-amber">Plan</span>
            </h1>
            <p className="font-worksans text-sm text-br-cyan/50 max-w-md mx-auto">
              Go premium to remove ads and unlock all features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-br-dark-card border ${plan.border} rounded-3xl p-6 md:p-8 ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-br-amber text-navy font-space text-[10px] uppercase tracking-widest font-bold px-4 py-1 rounded-full">
                      Best Value
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-xl border ${plan.border} flex items-center justify-center mb-5 ${plan.popular ? 'bg-br-amber/10' : 'bg-br-cyan/10'}`}>
                    <Icon className={`w-7 h-7 ${plan.color}`} />
                  </div>

                  <h2 className={`font-orbitron text-lg ${plan.color} tracking-wider mb-1`}>
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-orbitron text-4xl font-bold text-white`}>
                      {plan.price}
                    </span>
                    <span className="font-worksans text-sm text-white/40">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 ${plan.color}`} />
                        <span className="font-worksans text-sm text-white/70">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <RetroButton
                    variant={plan.popular ? 'blade-amber' : 'blade'}
                    className="w-full"
                    loading={loading}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Subscribe {plan.name}
                  </RetroButton>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
      <BottomNav expiringCount={0} />
    </div>
  )
}
