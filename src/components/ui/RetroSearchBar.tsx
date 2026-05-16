import { Search, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  blade?: boolean
}

export function RetroSearchBar({ value, onChange, placeholder = 'Search documents...', blade }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${blade ? 'text-br-cyan/50' : 'text-olive/50'}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-3 ${
          blade
            ? 'bg-br-dark border border-br-cyan/30 rounded-xl text-br-cyan placeholder:text-br-cyan/30 focus:border-br-cyan font-space text-sm'
            : 'bg-offwhite border-2 border-olive rounded-xl text-navy placeholder:text-olive/50 focus:border-mustard font-worksans'
        } focus:outline-none transition-colors duration-200`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${blade ? 'text-br-cyan/50 hover:text-br-cyan' : 'text-olive/50 hover:text-olive'}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
