import { useEffect, useState } from "react"

export const useStateWithCB = (state, cb) => {
  const [st, setSt] = useState(state)
  useEffect(() => {
    cb(st)
  }, [st, cb])
  return [st, setSt]
}