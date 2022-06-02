import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { Call } from "../components/call"
import ProductCard from "../components/card"
import AppBar from "../components/navbar"
import { PRODUCTS } from "../utils/products"
import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from "react"

export const HomePage = ({ clevertap }) => {
  let name
  let email
  const history = useNavigate()
  let { state } = useLocation()
  useEffect(() => {
    console.log(state)
    if (!state || !state.name || !state.email) {
      history('/')
      return
    }
  }, [state])
  const [items, setItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [product, setProduct] = useState([])
  if (state) {
    name = state.name
    email = state.email
    // if (state.name) {
    // }
    // if (state.email) {
    // }
  }
  const showToast = (message) => {
    toast(message)
  }


  const handleAddToCart = (id, price, image, name) => {
    if (items.indexOf(id) < 0) {
      setItems([...items, id])
      setProduct([...product, { image, name, price, id, quantity: 1 }])

    } else {

    }
    setTotalCost(totalCost + price)
    clevertap.event.push("Product added to cart", { productId: id, price, quantity: 1, image, name })
    showToast("Clevertap Add To Cart Event Recorded")
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      clevertap.event.push("Charged", {
        Items: product
      })
      showToast("Clevertap Charged Event Recorded")
      setItems([])
      setTotalCost(0)
      setProduct([])
    }
  }



  return (
    <>
      <AppBar totalItems={items} totalCost={totalCost} product={product} handleCheckout={handleCheckout} />
      <div style={{ paddingLeft: '6%', paddingTop: '5%' }}>

        <div className="flex flex-wrap mt-12 mb-12">
          {
            PRODUCTS.map(products => {
              return (
                <div className="m-4" key={products.id}>
                  <ProductCard {...products} handleAddToCart={handleAddToCart} />
                </div>
              )
            })
          }
        </div>
        {
          !email ? null : <Call clevertap={clevertap} name={name} email={email} />
        }

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
    </>
  )
}