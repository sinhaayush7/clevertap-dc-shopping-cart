import { useEffect } from "react"
import * as DirectCall from '../libs/directcall-sdk'


export const Call = () => {

  let clevertap = window.clevertap
  let dcClient
  useEffect(() => {
    DirectCall.init({
      accountId: "61a52046f56a14cb19a1e9cc",
      apikey: "9dcced09dae16c5e3606c22346d92361b77efdb360425913850bea4f22d812dd",
      cuid: "ayush.sinha@clevertap.com",
      clevertap
    }).then((client) => dcClient = client).catch(err => console.log(err))
  }, [])

  return (
    <>
      <button
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Call Support
      </button>
    </>
  )
}
