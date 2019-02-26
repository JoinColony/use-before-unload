import { useEffect } from 'react'

const useBeforeUnload = (
  value: ((evt: BeforeUnloadEvent) => any) | string
) => {
  const handleBeforeunload = (evt: BeforeUnloadEvent) => {
    let returnValue
    if (typeof value === 'function') {
      returnValue = value(evt)
    } else {
      returnValue = value
    }
    if (returnValue) {
      evt.preventDefault()
      evt.returnValue = returnValue
    }
    return returnValue
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload)
    return () => window.removeEventListener('beforeunload', handleBeforeunload)
  }, [])
}

export default useBeforeUnload
