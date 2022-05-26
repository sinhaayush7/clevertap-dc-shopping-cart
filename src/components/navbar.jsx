
const CartIcon = ({ totalItems, totalCost, handleCheckout }) => {

  return (
    <div className="flex items-center justify-between">
      <div className="mr-4">
        <p className="text-sm text-white">Total Items: {totalItems.length}</p>
        <p className="text-sm text-white">Total Cost: {totalCost}</p>
      </div>
      <button className="bg-transparent hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center border border-white" onClick={() => handleCheckout(totalItems)}>

        <span>Checkout</span>
      </button>
    </div>
  )
}

const AppBar = ({ totalItems, totalCost, product, handleCheckout }) => {
  return (
    <div className="fixed">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 w-screen">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">Veggies</span>
        </div>
        {/* <SearchBar /> */}
        <CartIcon fill="white" totalCost={totalCost} totalItems={totalItems} product={product} handleCheckout={handleCheckout} />
      </nav>
    </div>
  )
}

export default AppBar