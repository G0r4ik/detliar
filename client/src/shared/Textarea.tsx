import { FormEvent, RefObject, forwardRef, useEffect } from 'react'

interface TextareaProps {
  onInput?: (event: FormEvent<HTMLTextAreaElement>) => void
  rows?: number
  placeholder: string
  id: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function MyInput({ onInput, ...props }, ref: RefObject<HTMLTextAreaElement>) {
    // const ref = useRef<HTMLTextAreaElement>(null) // Typed useRef

    const updateHeight = () => {
      if (ref.current) {
        // Check for existence before accessing properties
        ref.current.style.height = 'auto'
        ref.current.style.height = `${ref.current.scrollHeight}px`
      }
    }

    useEffect(() => {
      updateHeight()
    }, [updateHeight])

    return (
      <textarea
        ref={ref} // Use the custom ref
        {...props}
        onInput={e => {
          updateHeight()
          onInput?.(e) // Call optional callback if provided
        }}
      />
    )
  }
)

export default Textarea
