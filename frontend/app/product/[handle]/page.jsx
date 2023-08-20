"use client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
// import { Footer } from "../../../components/layout/Footer";
import { ProductDescription } from "../../../components";
import { GridTileImage } from "../../../components/grid/tile";
import { Gallery } from "../../../components/product/gallery";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Skeleton } from "@mantine/core";
import TransformModal from "../../../components/TransformModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { toast } from "react-hot-toast";

import Link from "next/link";

export const runtime = "edge";

export default function ProductPage({ params }) {
  const [user] = useAuthState(auth);
  const [item, setItem] = useState({});
  const [opened, { open, close }] = useDisclosure(false);

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

  const product = {
    id: item.productID,
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
    tags: ["tag1", "tag2"],
  };

  if (!product) return <Skeleton height={50} />;

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
      <Modal
        opened={opened}
        onClose={close}
        title="Virtual Try On"
        centered
        size="70%"
      >
        <TransformModal clothImageUrl={product.images[0].url} />
      </Modal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div
        className="mx-auto max-w-screen-2xl px-4"
        style={{ minHeight: "25.2rem" }}
      >
        <div
          className="flex flex-col md:p-12 lg:flex-row lg:gap-8"
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className="h-full w-full basis-full lg:basis-4/6 bg-transparent backdrop-filter backdrop-blur-sm border p-8 rounded-lg  border-neutral-200 dark:border-neutral-800">
            <Gallery
              images={product.images.map((image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </div>
          (
          <div className=" basis-full lg:basis-2/6 border  border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent backdrop-filter p-8 backdrop-blur-sm">
            <ProductDescription product={product} />
            {user ? (
              <>
                <button
                  onClick={open}
                  className="bg-blue-500 border-2 border-transparent hover:bg-blue-700 text-white font-bold py-5 px-5 rounded-lg w-100"
                >
                  Virtual Try On
                </button>

                <button
                  onClick={() => {
                    const obj = {
                      productID: product.id,
                      productImage: product.images[0].url,
                      productName: product.title,
                      productPrice:
                        product.priceRange.minVariantPrice.amount,
                      type: "STORE",
                    };
                    let cart = JSON.parse(
                      localStorage.getItem("cart")
                    );
                    if (!cart) {
                      cart = [];
                    }
                    cart.push(obj);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify(cart)
                    );
                    toast.success("Added to cart");
                  }}
                  className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-bold py-5 px-5 rounded-lg w-100 ml-2"
                >
                  Add to cart
                </button>
              </>
            ) : (
              <div style={{ fontSize: "20px" }}>
                Log In to try Virtual Try On
              </div>
            )}
          </div>
          )
        </div>
        <Suspense>
          <RelatedProducts imageURL={product.images[0].url} />
        </Suspense>
      </div>
    </>
  );
}

function RelatedProducts({ imageURL }) {
  "use client";
  const [relatedProducts, setRelatedProducts] = useState([
    { id: -1 },
    { id: -2 },
    { id: -3 },
    { id: -4 },
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/related-products/5", {
        image_url: imageURL,
      })
      .then(({ data }) =>
        setRelatedProducts(data.map((item) => item.data))
      )
      .catch((err) => console.log(err));
  }, []);

  console.log(relatedProducts);

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.id}`}
            >
              {product.id > 0 ? (
                <GridTileImage
                  alt={product.title}
                  active={false}
                  label={{
                    title: product.title,
                    amount: product.discountedPrice,
                    currencyCode: "INR",
                  }}
                  src={product.styleImages.default.imageURL}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              ) : (
                <div className="relative h-full w-full bg-gray-200 animate-pulse"></div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
