import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { Call } from "../components/call"
import ProductCard from "../components/card"
import AppBar from "../components/navbar"
import { PRODUCTS } from "../utils/products"
import * as DirecatCall from '../libs/directcall-sdk'

export const HomePage = ({ clevertap, name, email }) => {
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
    console.log(message)
    toast(message)
  }


  const handleAddToCart = (id, price, image, name) => {
    if (items.indexOf(id) < 0) {
      setItems([...items, id])
      console.log(product, "this is product from productcart")
      setProduct([...product, { image, name, price, id, quantity: 1 }])

    } else {

    }
    setTotalCost(totalCost + price)
    clevertap.event.push("Product added to cart", { productId: id, price, quantity: 1, image, name })
    showToast("Clevertap Add To Cart Event Recorded")
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      // console.log(product)
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

        <div className="flex flex-wrap mb-3 mt-12 mb-12">
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
        <ToastContainer position="bottom-right"
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