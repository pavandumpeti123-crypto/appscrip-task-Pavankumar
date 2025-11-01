
 

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDataAction } from "../../store/store.js";
import "./productBody.css";
import axios from "axios";
import ProductCart from "../product cart/productCart.jsx";

export default function ProductBody({ showSidebar }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.productData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://fakestoreapi.com/products");
                dispatch(productDataAction.updateData(data));
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <section className={!showSidebar ? "product-body" : "product-body-side"}>
            {products.map((product) => (
                <ProductCart product={product} key={product.id} />
            ))}
        </section>
    );
}