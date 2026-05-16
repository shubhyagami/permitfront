export function ShimmerCard({ blade }: { blade?: boolean }) {
  return (
    <div className={`${blade ? 'blade-card' : 'retro-card'} p-4`}>
      <div className={`h-4 rounded w-3/5 animate-pulse mb-2 ${blade ? 'bg-br-cyan/10' : 'bg-gray-200'}`} />
      <div className={`h-3 rounded w-2/5 animate-pulse mb-4 ${blade ? 'bg-br-cyan/10' : 'bg-gray-200'}`} />
      <div className={`h-20 rounded animate-pulse ${blade ? 'bg-br-cyan/10' : 'bg-gray-200'}`} />
    </div>
  )
}
