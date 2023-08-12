import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

function ThreeItemGridItem({ item, size, priority }) {
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
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
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
            title: item.title,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode:
              item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const homepageItems = [
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
  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-7 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 m-5">
      <ThreeItemGridItem
        size="full"
        item={firstProduct}
        priority={true}
      />
      <ThreeItemGridItem
        size="half"
        item={secondProduct}
        priority={true}
      />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
