/* eslint-disable react/prop-types */
import React from "react";

import { Product } from "../../models";
import CircleRating from "../CircleRating";
import Img from "../LazyLoadImage/Img";
import "./style.scss";

interface ProductProps {
    product: Product;
    fromSearch: boolean;
}

const ProductCard = ({ product, fromSearch }: ProductProps) => {
    return (
        <div className="productCard">
            <div className="posterBlock">
                <Img className="posterImg" src={product.thumbnail} alt="poster" />
            </div>
            <div className="textBlock">
                <div className="infomation">
                    <span className="title">{product.title}</span>
                    <span className="price">{product.price}</span>

                </div>
                <div className="rating">
                    <CircleRating rating={product.rating.toFixed(1)} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
