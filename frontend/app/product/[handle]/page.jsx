"use client";
import axios from "axios";
import { notFound } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
// import { Footer } from "../../../components/layout/Footer";
import { ProductDescription } from "../../../components";
import { GridTileImage } from "../../../components/grid/tile";
import { Gallery } from "../../../components/product/gallery";

// import GridTileImage from "../components/grid/tile";
// import Footer from "../components/layout/Footer";

// import { Gallery } from "components/product/gallery";
// import ProductDescription from "../components/product/product-description";
// import { HIDDEN_PRODUCT_TAG } from "lib/constants";
// import { getProduct, getProductRecommendations } from "lib/shopify";
// import { Image } from "lib/shopify/types";
import Link from "next/link";

export const runtime = "edge";

// export function generateMetadata({ params }) {
//   //   const product = await getProduct(params.handle);
//   const [item, setItem] = useState({});
//   console.log(params.handle);
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/product/params.handle")
//       .then((res) => {
//         setItem(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   console.log(item);
//   const product = {
//     title: "Product Title",
//     description: "Product Description",
//     featuredImage: {
//       url: "https://clipart-library.com/images_k/t-shirt-transparent/t-shirt-transparent-15.jpg",
//       width: 100,
//       height: 100,
//       altText: "Product Image",
//     },
//     seo: {
//       title: "Product Title",
//       description: "Product Description",
//     },
//     availableForSale: true,
//     priceRange: {
//       minVariantPrice: {
//         currencyCode: "USD",
//         amount: 100,
//       },
//       maxVariantPrice: {
//         currencyCode: "USD",
//         amount: 100,
//       },
//     },
//     images: [
//       {
//         url: "https://clipart-library.com/images_k/t-shirt-transparent/t-shirt-transparent-15.jpg",
//         width: 100,
//         height: 100,
//         altText: "Product Image",
//       },
//     ],
//     handle: "product-handle",
//     id: "product-id",
//     tags: ["tag1", "tag2"],
//   };

//   if (!product) return notFound();

//   const {
//     url,
//     width,
//     height,
//     altText: alt,
//   } = product.featuredImage || {};
//   //   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

//   return {
//     title: product.seo.title || product.title,
//     description: product.seo.description || product.description,
//     // robots: {
//     //   index: indexable,
//     //   follow: indexable,
//     //   googleBot: {
//     //     index: indexable,
//     //     follow: indexable,
//     //   },
//     // },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               width,
//               height,
//               alt,
//             },
//           ],
//         }
//       : null,
//   };
// }

export default function ProductPage({ params }) {
  const [item, setItem] = useState({});
  console.log(params.handle);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${params.handle}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!item || !item.data) {
    return <div>loading...</div>;
  }

  console.log(item.data, typeof item.data);
  const product = {
    title: item.data.productDisplayName,
    description: item.data["productDescriptors"].description.value,
    descriptionHtml:
      item.data["productDescriptors"].description.value,
    featuredImage: {
      url: item.data["styleImages"].default.imageURL,
      width: 100,
      height: 100,
      altText: "Product Image",
    },
    seo: {
      title: item.data.productDisplayName,
      description: item.data["productDescriptors"].description.value,
    },
    availableForSale: true,
    priceRange: {
      minVariantPrice: {
        currencyCode: "INR",
        amount: item.data["discountedPrice"],
      },
      maxVariantPrice: {
        currencyCode: "INR",
        amount: item.data["discountedPrice"],
      },
    },
    images: [
      {
        url: item.data["styleImages"].default.imageURL,
        width: 100,
        height: 100,
        altText: "Product Image",
      },
    ],
    handle: "product-handle",
    id: item.data.productID,
    tags: ["tag1", "tag2"],
  };

  // if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div
          className="flex flex-col    md:p-12 lg:flex-row lg:gap-8"
          style={{ justifyContent: "space-between" }}
        >
          <div className="h-full w-full basis-full lg:basis-4/6 bg-transparent backdrop-filter backdrop-blur-sm border p-8 rounded-lg  border-neutral-200 dark:border-neutral-800">
            <Gallery
              images={product.images.map((image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6 border  border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent backdrop-filter p-8 backdrop-blur-sm">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.featuredImage.url} />
        </Suspense>
      </div>
      <Suspense>{/* <Footer /> */}</Suspense>
    </>
  );
}

function RelatedProducts({ imageURL }) {
  const [base64Image, setBase64Image] = useState("");

  const convertToBase64 = async () => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
      setBase64Image(base64);
      console.log(base64);
    } catch (err) {
      console.log(err);
    }
  };

  convertToBase64();
  const base64Data = base64Image.split(",")[1];

  const relatedProducts = [
    {
      title: "Product Title",
      description: "Product Description",
      featuredImage: {
        url: "https://clipart-library.com/images_k/t-shirt-transparent/t-shirt-transparent-15.jpg",
        width: 100,
        height: 100,
        altText: "Product Image",
      },
      seo: {
        title: "Product Title",
        description: "Product Description",
      },
      availableForSale: true,
      priceRange: {
        minVariantPrice: {
          currencyCode: "USD",
          amount: 100,
        },
        maxVariantPrice: {
          currencyCode: "USD",
          amount: 100,
        },
      },
      images: [
        {
          url: "https://clipart-library.com/images_k/t-shirt-transparent/t-shirt-transparent-15.jpg",
          width: 100,
          height: 100,
          altText: "Product Image",
        },
      ],
      handle: "product-handle",
      id: "product-id",
      tags: ["tag1", "tag2"],
    },
  ];

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
            >
              <GridTileImage
                alt={product.title}
                active={false}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode:
                    product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
