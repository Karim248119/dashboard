import React from "react";
import { Link } from "react-router-dom";
import { base_url, base_url_photo } from "../api/config.js";
import Button from "./buttons/Button.jsx";
export default function Card({ product }) {
  return (
    <div className="w-1/3 px-2 my-5" key={product._id}>
      <Link to="/" className="group relative block overflow-hidden">
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <img
          src={`${base_url_photo}${product.main_image}`}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm text-gray-700">{product.description}</p>
          <p className="mt-1.5 text-sm text-gray-700">
            ${product?.price ? product.price : 145}
          </p>
        </div>

        <Button title="Add to card" className="w-full" />
      </Link>
    </div>
  );
}
