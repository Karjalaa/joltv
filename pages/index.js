import Product from "@/components/Product";
import { connMongoose } from "@/library/mongoose";
import { useEffect, useState } from "react"
import { findProducts } from "./api/products";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";



export default function Home({products}) {

  const [search, setSearch] = useState("");
  
  const categories = [...new Set(products.map(p => p.category))];


  if (search) {
    products = products.filter(p => p.name.toLowerCase().includes(search));
  } 


  return (
   <Layout>
      

    <div className="flex flex-col justify-center items-center">
    <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Etsi tuotteita" className="w-4/12 py-2 px-4 rounded-xl" />
    </div>
    <div>
      {categories.map(categoryName => (
        <div key={categoryName}>
          {products.find(p => p.category === categoryName) && (
            <div>
              <h2 className="text-2xl py-4">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x">
                  {products.filter(p => p.category === categoryName).map(productInfo => (
                  <div key={productInfo._id} className="px-5 snap-start">
                  <Product {...productInfo} />
              </div>
          ))}
            </div>
            </div>
          )}
          </div>
      ))}
    </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await connMongoose();
  const products = await findProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
