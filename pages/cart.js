import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
    const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
    const [productsInfos, setProductsInfos] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [infoDelivery, setInfoDelivery] = useState("");


    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqIds.join(','))
          .then(response => response.json())
          .then(json => setProductsInfos(json));
      }, [selectedProducts]);

      function addMoreProductsCart(id) {
        setSelectedProducts(prev => [...prev,id]);
      } 

      function decreaseProductsCart(id) {
        const status = selectedProducts.indexOf(id);
        if (status !== -1) {
            setSelectedProducts( prev => {
                return prev.filter((value,index) => index !== status);
            });
        }
      }

      let productsTotal = 0;
      if (selectedProducts?.length) {
        for (let id of selectedProducts) {
          const price = productsInfos.find(p =>p._id ===id)?.price;
          productsTotal += price;
        }
      }

      const deliveryPrice = 6;

      const totalPrice = productsTotal + deliveryPrice; 

      

    return (
    <Layout>
      {!productsInfos.length && (
        <div>Tilauksesi on tyhjä</div>
      )}
      {productsInfos.length && productsInfos.map(productInfo => {
        const number = selectedProducts.filter(id => id === productInfo._id).length;
        if (number === 0)
        return; 
        return (
        <div className="flex mb-5" key={productInfo._id}>
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-32" src={productInfo.pic} alt="" />
            </div>
            <div className="pl-4">
                <h3 className="font-bold text-base">{productInfo.name}</h3>
                <p className="text-sm leading-relaxed">{productInfo.desc}</p>
                <div className="flex space-x-8">
                    <div className="">{productInfo.price} €</div>
                    <div>
                        <button onClick={() => decreaseProductsCart(productInfo._id)} className="border border-[#009de0] px-1 rounded-xl text-[#009de0] text-sm">-</button>
                        <span className="px-2">
                        {selectedProducts.filter(id => id === productInfo._id).length}
                        </span>
                        <button onClick={() => addMoreProductsCart(productInfo._id)} className="border border-[#009de0] px-1 rounded-xl text-[#009de0] text-sm">+</button>
                    </div>
                </div>
            </div>
        </div>
      )})}
  <form action="/api/checkout" method="POST">
    <div className="ml-4">
      <div className="flex space-x-8">
        <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="rounded-lg px-4 py-2 w-72" type="text" placeholder="Etunimi"></input>
        <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="rounded-lg px-4 w-72" type="text" placeholder="Sukunimi"></input>
      </div>
      <div className="flex mt-7 space-x-8">
        <input name="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="rounded-lg px-4 py-2 w-72" type="text" placeholder="Puhelinnumero"></input>
        <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-lg px-4 w-72" type="text" placeholder="Sähköpostiosoite"></input>
      </div>
      <div className="flex mt-7 space-x-8">
        <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="rounded-lg px-4 py-2 w-72" type="text" placeholder="Katuosoite"></input>
        <input name="city" value={city} onChange={e => setCity(e.target.value)} className="rounded-lg px-4 w-72" type="text" placeholder="Paikkakunta"></input>
      </div>
      <div className="flex mt-7 space-x-8">
        <input name="infoDelivery" value={infoDelivery} onChange={e => setInfoDelivery(e.target.value)} className="rounded-lg px-4 py-2 w-96" type="text" placeholder="Lisätiedot lähetille"></input>
      </div>
    </div>
    <div className="mt-6 w-96 ml-5">
      <div className="flex my-4">
        <h3 className="font-bold grow">Tuotteet:</h3>
        <h3 className="">{productsTotal.toFixed(2)} €</h3>
        </div>
        <div className="flex my-4">
        <h3 className="font-bold grow">Toimitus:</h3>
        <h3 className="">{deliveryPrice} €</h3>
        </div>
        <div className="flex my-4 border-t-2 border-[#009de0] pt-1">
        <h3 className="font-bold grow">Yhteensä:</h3>
        <h3 className="">{totalPrice.toFixed(2)} €</h3>
        </div>
        <div className="flex justify-center">
            <input type="hidden" name="products" value={selectedProducts.join(",")} />
        <button type="submit" className="bg-[#009de0] px-4 py-2 rounded-xl text-white shadow-md shadow-[#009de0]">Stripe {totalPrice.toFixed(2)} €</button>
        </div>
      </div>
      </form>
      
    </Layout>
    )
}