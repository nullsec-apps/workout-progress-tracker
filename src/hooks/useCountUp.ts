import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0)
  const raf = useRef<number>()
  const start = useRef<number>()

  useEffect(() => {
    start.current = undefined
    const animate = (t: number) => {
      if (start.current === undefined) start.current = t
      const progress = Math.min((t - start.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf.current = requestAnimationFrame(animate)
      else setValue(target)
    }
    raf.current = requestAnimationFrame(animate)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])

  return value
}