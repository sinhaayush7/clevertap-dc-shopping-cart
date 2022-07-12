
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BadgeComponent } from '../components/badge';
import { SelectComponent } from '../components/select';
import { SpinnerComponent } from '../components/spinner';
import * as DirectCallClient from '../libs/directcall-sdk';
import '../styles/login.css';


const LoginPage = () => {

  let clevertap = window.clevertap
  const [name, setName] = useState('')
  const [cuid, setCuid] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLp, setIsLp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useNavigate()

  const showToast = (message) => {
    toast(message)
  }

  const validateCuid = (arg) => {
    let str = /^[a-zA-Z0-9]+([_.][a-zA-Z0-9]+)*$/
    let reg = new RegExp(str)
    return reg.test(arg)
  }


  const profilePushPressed = (e) => {
    e.preventDefault()
    if (!name || !cuid) {
      setErrorMessage("* Name and Email are mandatory fields")
      return setShowError(true)
    }
    if (!validateCuid(cuid)) {
      setErrorMessage(`* cuid can be only alphanumeric values.No special characters allowed other than _ or .`)
      return setShowError(true)
    }
    setIsLoading(true)
    DirectCallClient.init({
      accountId: "61a52046f56a14cb19a1e9cc",
      apikey: "9dcced09dae16c5e3606c22346d92361b77efdb360425913850bea4f22d812dd",
      cuid: isLp ? cuid + ".lp" : cuid,
      name,
      clevertap
    }).then((client) => {
      clevertap.profile.push({
        "Site": {
          "Name": "Carl Johnson",
          "Identity": name,
          "Email": isLp ? cuid + ".lp" : cuid,
          "Phone": "+919999999999",
          "Gender": "M",
          "DOB": new Date("1988-08-24"),
          "Photo": 'https://img1.svg.com/img/gallery/what-the-critics-are-saying-about-yakuza-like-a-dragon/intro-1602524858.jpg',    // URL to the Image
        }
      })
      showToast("CleverTap Profile Push Event Recorded!")
      window.dcClient = client
      history('/home', { state: { name, cuid: isLp ? cuid + ".lp" : cuid } });
    }).catch(err => {
      if (err && err.message) {
        toast(err.message)
      } else {
        toast(err)
      }
    }).finally(() => setIsLoading(false))
  }

  const handleEmailSelect = (val) => {
    if (+val === 2) {
      setIsLp(true)
    } else {
      setIsLp(false)
    }
  }

  return (
    <div className="auth-wrapper">
      {
        isLoading ? <div className='relative'>
          <div className='spinner-overlay'>
            <SpinnerComponent style={{ position: "absolute", zIndex: 9999, top: "50%", left: "50%" }} />
          </div>
        </div> : null
      }
      <div className="auth-inner">
        <div className="img-parent">
          <img src="logo.png" width="100px" height="100px" alt="logo" />
        </div>
        <form>
          <h3 className='text-2xl'>Sign In</h3>
          <div className="form-group">
            <label className="block text-gray-700 text-md font-regular mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter Name" onChange={e => { setName(e.target.value); setShowError(false) }} />
          </div>
          <div className="form-group">
            <div className="grid gap-6 mb-6">
              <div className="col-span-12 sm:col-span-12">
                <label className="block text-gray-700 text-md font-regular mb-2" htmlFor="name">
                  Email Address
                </label>
                <div>
                  <div className="mt-1 flex rounded-md shadow-sm relative">
                    <input className="shadow appearance-none border rounded flex-1 w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter email" onChange={e => { setCuid(e.target.value); setShowError(false) }} />
                    {
                      isLp ? <BadgeComponent text=".lp" style={{ height: 20, width: 50, left: "43%", top: "22%", position: "absolute" }} /> : null
                    }
                    <SelectComponent cb={handleEmailSelect} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={profilePushPressed} className="btn btn-primary px-4 py-2 rounded w-full text-white">Login</button>
          {/* <button onClick={onUserLoginPressed} className="btn btn-primary px-4 py-2 rounded text-white">On User Login</button> */}
          {
            showError ? <>
              <p className='pt-4 text-red-400 text-sm'>{errorMessage}</p>
            </> : null
          }
        </form>
      </div>
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  )
}

export default LoginPage