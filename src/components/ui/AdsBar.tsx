import { useSubscriptionStore } from '../../store/subscription.store'

export function AdsBar() {
  const isSubscribed = useSubscriptionStore(s => s.isSubscribed)

  if (isSubscribed) return null

  return (
    <div className="relative w-full h-10 bg-gradient-to-r from-br-dark via-br-amber/10 to-br-dark border-b border-br-amber/20 overflow-hidden">
      <div className="absolute inset-0 flex items-center whitespace-nowrap animate-marquee">
        <span className="font-space text-xs uppercase tracking-widest text-br-amber/70 mx-8">
          &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022;
        </span>
        <span className="font-space text-xs uppercase tracking-widest text-br-amber/70 mx-8">
          &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022;
        </span>
        <span className="font-space text-xs uppercase tracking-widest text-br-amber/70 mx-8">
          &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022;
        </span>
        <span className="font-space text-xs uppercase tracking-widest text-br-amber/70 mx-8">
          &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022; Advertise Here &#x2022;
        </span>
      </div>
    </div>
  )
}
