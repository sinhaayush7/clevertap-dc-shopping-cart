
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import '../styles/login.css';
import 'react-toastify/dist/ReactToastify.min.css';


const LoginPage = () => {

  let clevertap = window.clevertap
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const history = useNavigate()

  const showToast = (message) => {
    toast(message)
  }



  const validateEmail = (arg) => {
    let str = /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/
    let reg = new RegExp(str)
    return reg.test(arg)
  }

  const profilePushPressed = (e) => {
    e.preventDefault()
    if (!name || !email) {
      setErrorMessage("* Name and Email are mandatory fields")
      return setShowError(true)
    }
    if (!validateEmail(email)) {
      setErrorMessage("* The email entered is not a valid email")
      return setShowError(true)
    }
    clevertap.profile.push({
      "Site": {
        "Name": "Carl Johnson",
        "Identity": name,
        "Email": email,
        "Phone": "+919999999999",
        "Gender": "M",
        "DOB": new Date("1988-08-24"),
        "Photo": 'https://img1.svg.com/img/gallery/what-the-critics-are-saying-about-yakuza-like-a-dragon/intro-1602524858.jpg',    // URL to the Image
      }
    })

    showToast("CleverTap Profile Push Event Recorded!")

    history('/home', { state: { name, email } });
  }

  // const onUserLoginPressed = (e) => {
  //   e.preventDefault()
  //   if (!name || !email) {
  //     return setShowError(true)
  //   }
  //   clevertap.onUserLogin.push({
  //     "Site": {
  //       "Name": "Niko Bellic",
  //       "Identity": name,
  //       "Email": email,
  //       "Phone": "+919999999999",
  //       "Gender": "M",
  //       "DOB": new Date("1988-08-24"),
  //       "Photo": 'https://img1.svg.com/img/gallery/what-the-critics-are-saying-about-yakuza-like-a-dragon/intro-1602524858.jpg',    // URL to the Image
  //     }
  //   })
  //   showToast("CleverTap OnUserLogin Event Recorded!")

  //   history('/home', { state: { name, email } });
  // }


  return (
    <div className="auth-wrapper">
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
            <label className="block text-gray-700 text-md font-regular mb-2" htmlFor="name">
              Email Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter email" onChange={e => { setEmail(e.target.value); setShowError(false) }} />
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