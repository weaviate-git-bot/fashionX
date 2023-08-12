"use client";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export function Carousel() {
  const carouselProducts = [
    {
      title: "Product 1",
      featuredImage: {
        url: "https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png",
      },
      priceRange: {
        maxVariantPrice: { amount: "10$", currencyCode: "USD" },
      },
      handle: "product-1",
    },
    {
      title: "Product 1",
      featuredImage: {
        url: "https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png",
      },
      priceRange: {
        maxVariantPrice: { amount: "10$", currencyCode: "USD" },
      },
      handle: "product-1",
    },
    {
      title: "Product 1",
      featuredImage: {
        url: "https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png",
      },
      priceRange: {
        maxVariantPrice: { amount: "10$", currencyCode: "USD" },
      },
      handle: "product-1",
    },
    {
      title: "Product 1",
      featuredImage: {
        url: "https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png",
      },
      priceRange: {
        maxVariantPrice: { amount: "10$", currencyCode: "USD" },
      },
      handle: "product-1",
    },
  ];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.handle}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode:
                    product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
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
