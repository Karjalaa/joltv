import { useContext } from "react"
import { ProductsContext } from "./ProductsContext"

export default function Product({_id, name, desc, price, kgprice, pic}) {
  const {setSelectedProducts} = useContext(ProductsContext);
  function addItemCart() {
    setSelectedProducts(prev => [...prev, _id]);
  }
    return (
        <div className="w-64">
          <div className="bg-[#363636] p-5 rounded-xl">
            <img className="object-cover h-48 w-64" src={pic} alt=""/>
          </div>
          <div className="mt-2 h-20">
            <h3 className="font-bold py-5 text-base">{name}</h3>
          </div>
          <div className="flex mt-1">
            <div className="font-bold grow text-base">{price} €</div>
            <button onClick={addItemCart} className="bg-[#009de0] text-white py-1 px-3 rounded-xl">Lisää tuote</button>
          </div>
          <div className="flex mt-1 mb-2">
            <div className="text-blue-400 text-sm">{kgprice} €/kg</div>
            </div>
            <p className="text-sm mt-4 leading-4 mb-7">{desc}</p>
        </div>
    );
}