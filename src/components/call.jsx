import { useState } from "react"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import * as DirectCall from '../libs/directcall-sdk'
import 'react-toastify/dist/ReactToastify.min.css';

export const Call = ({ name, email }) => {

  let clevertap = window.clevertap
  let [dcClient, setDcClient] = useState(undefined)
  useEffect(() => {
    DirectCall.init({
      accountId: "61a52046f56a14cb19a1e9cc",
      apikey: "9dcced09dae16c5e3606c22346d92361b77efdb360425913850bea4f22d812dd",
      cuid: email,
      name,
      clevertap
    }).then((client) => {
      setDcClient(client)
    }).catch(err => {
      if (err && err.message) {
        toast(err.message)
      } else {
        toast(err)
      }
    })
  }, [email, name, clevertap])

  const makeCall = () => {
    // const cuids = ['ayush.sinha@clevertap.com', 'sumantu@clevertap.com', 'shivam.sharma@celvertap.com', 'darshan.pania@clevertap.com', 'sumantudc@clevertap.com']
    // const callee = cuids[Math.floor(Math.random() * cuids.length)];
    dcClient.call('pankajdc@clevertap.com', 'Introductroy Call').then(res => toast('call ' + res)).catch(err => {
      if (err && err.message) {
        toast(err.message)
      } else {
        toast('call ' + err)
      }
    })
  }
  return (
    <>
      <button

        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 fixed right-5 bottom-10" style={{ borderRadius: "50%", width: "60px", height: "60px" }} onClick={() => makeCall()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" style={{ marginTop: "8px" }} />
        </svg>
      </button>
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  )
}
