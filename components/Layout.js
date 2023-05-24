import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ProductsContext } from "./ProductsContext";

export default function Layout({children}) {
    const {setSelectedProducts} = useContext(ProductsContext);
    const [success, setSuccess] = useState(false);

    useEffect (() => {
        if (window.location.href.includes("success")) {
            setSelectedProducts([]);
            setSuccess(true);
        }
    }, []);
    return (
<div>
    <Navbar />
        <div className="p-5">
            {success && (
                <div className="flex justify-center">
                <div className="mb-5 bg-[#009de0] text-xl p-3 rounded-xl w-80 flex justify-center">
                    <p className="">Tilauksesi saapuu pian!</p>
                </div>
                </div>
            )}
            {children}
        </div>
    </div>
    )
}