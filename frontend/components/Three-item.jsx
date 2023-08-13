"use client";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
function ThreeItemGridItem({ item, size, priority }) {
  console.log(item.id);
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.id}`}
      >
        <GridTileImage
          src={item.styleImages.default.imageURL}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.productDisplayName,
            amount: item.price,
            currencyCode: "INR",
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const [homepageItems, setHomepageItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/frontpage/3")
      .then((res) => {
        console.log(res);
        setHomepageItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-7 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 m-5">
      {firstProduct && (
        <ThreeItemGridItem
          size="full"
          item={firstProduct.data}
          priority={true}
        />
      )}
      {secondProduct && (
        <ThreeItemGridItem
          size="half"
          item={secondProduct.data}
          priority={true}
        />
      )}
      {thirdProduct && (
        <ThreeItemGridItem size="half" item={thirdProduct.data} />
      )}
    </section>
  );
}
