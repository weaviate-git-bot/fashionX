"use client";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import { useEffect, useState } from "react";
import axios from "axios";

export function Carousel() {
  const [carouselProducts, setCarouselProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/frontpage/10")
      .then((res) => {
        console.log(res);
        setCarouselProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (carouselProducts.length === 0) {
    return null;
  }

  return (
    <div className=" w-full overflow-x-auto pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((item, i) => (
          <li
            key={item.data.productDisplayName}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${item.data.productID}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={item.data.productDisplayName}
                label={{
                  title: item.data.productDisplayName,
                  amount: item.data.price,
                  currencyCode: "INR",
                }}
                src={item.data.styleImages.default.imageURL}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
