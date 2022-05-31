import { useState } from "react"
import { useLocation } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { Call } from "../components/call"
import ProductCard from "../components/card"
import AppBar from "../components/navbar"
import { PRODUCTS } from "../utils/products"
import 'react-toastify/dist/ReactToastify.min.css';

export const HomePage = ({ clevertap }) => {
  const { state: { name, email } } = useLocation()
  const [items, setItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [product, setProduct] = useState([])


  // useEffect(() => {
  //   DirecatCall.init({
  //     accountId: "61a52046f56a14cb19a1e9cc",
  //     apikey: "9dcced09dae16c5e3606c22346d92361b77efdb360425913850bea4f22d812dd",
  //     cuid: "ayush123@gmail.com",
  //     clevertap
  //   })
  // })

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