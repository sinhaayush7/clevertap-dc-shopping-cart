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
    if (!state || !state.name || !state.cuid) {
      history('/')
      return
    }
  }, [state, history])

  useEffect(() => {
    clevertap.event.push("test Page Visited", {
      "test page": "Home",
    });
    document.addEventListener('CT_web_personalization', function (e) {
      clevertap.renderNotificationClicked(e.detail)
    })
  }, [clevertap]);

  const [items, setItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [product, setProduct] = useState([])

  const showToast = (message) => {
    toast(message)
  }


  const handleAddToCart = (id, price, image, name) => {
    if (items.indexOf(id) < 0) {
      setItems([...items, id])
      setProduct([...product, { image, name, price, id, quantity: 1 }])

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
      <div style={{ paddingTop: '5%' }}>
        <div id="banner" style={{ height: '405px', margin: '40px', overflow: 'hidden' }}></div>
        <div className="flex flex-wrap mb-3" style={{ paddingLeft: '6%' }}>
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
        <div id="carousel" style={{ height: '405px', margin: '40px', overflow: 'hidden' }}></div>
        <Call clevertap={clevertap} name={name} email={email} />

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