import { useEffect } from 'react'

export function useOutsideClick(ref, onClickOut: () => void, deps = []) {
  useEffect(() => {
    const onClick = ({ target }) => {
      !ref.current?.contains(target) && onClickOut?.()
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, deps)
}
