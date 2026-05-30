import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface State { hasError: boolean }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0e0d] text-[#e8f0ed] p-6">
          <div className="text-center max-w-sm">
            <div className="w-14 h-14 rounded-xl bg-[#141a18] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-[#22c55e]" />
            </div>
            <h2 className="font-display font-bold text-xl mb-2">Something went wrong</h2>
            <p className="text-sm text-[#5a6b66] mb-5">An unexpected error occurred. Try reloading the page.</p>
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-[#0a0e0d] font-semibold text-sm transition-all duration-200 hover:bg-[#1ea84f]">
              <RefreshCw size={16} /> Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}