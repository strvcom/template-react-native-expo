import { useRef } from 'react'

export function useLatestValue<T>(value: T) {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}
