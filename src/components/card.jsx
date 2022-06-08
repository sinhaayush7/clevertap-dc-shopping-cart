
const ProductCard = ({ image, name, price, id, category, handleAddToCart }) => {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg pb-3">
      <img className="w-7/12 m-auto" src={image} alt={category + "_" + id + "_" + name} />
      <p className="text-gray-600">{name}</p>
      <p className="text-2xl font-semibold mt-4 text-gray-600">&#8377;{" " + price}</p>
      <div className="px-6 pt-4 pb-2 ">
        <button className="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-700 hover:border-transparent rounded" onClick={() => handleAddToCart(id, price, image, name, category)}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard