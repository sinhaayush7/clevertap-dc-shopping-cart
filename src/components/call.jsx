import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export const Call = () => {
  let dcClient = window.dcClient
  

  const makeCall = () => {
    const cuids = ['sumantu','sumantudc']
    const callee = cuids[Math.floor(Math.random() * cuids.length)];
    if (dcClient && dcClient.isEnabled()) {
      toast("calling " + callee + '@clevertap.com')
      dcClient.call(callee, callee === 'sumantu' ? "Regarding Payment Failure" : "Your booking to Srinagar").then(res => toast('call ' + res)).catch(err => {
        if (err && err.message) {
          toast(err.message)
        } else {
          toast('call ' + err)
        }
      })
    } else {
      toast("Please wait while Signed Client is being connected")
    }
  }
  return (
    <>
      <button

        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 fixed right-9 bottom-10" style={{ borderRadius: "50%", width: "60px", height: "60px" }} onClick={() => makeCall()}
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
