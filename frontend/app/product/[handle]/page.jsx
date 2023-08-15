"use client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
// import { Footer } from "../../../components/layout/Footer";
import { ProductDescription } from "../../../components";
import { GridTileImage } from "../../../components/grid/tile";
import { Gallery } from "../../../components/product/gallery";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import TransformModal from '../../../components/TransformModal'

import Link from "next/link";

export const runtime = "edge";


export default function ProductPage({ params }) {
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
      <div className="mx-auto max-w-screen-2xl px-4">
        <div
          className="flex flex-col    md:p-12 lg:flex-row lg:gap-8"
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

          <div className="basis-full lg:basis-2/6 border  border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent backdrop-filter p-8 backdrop-blur-sm">
            <ProductDescription product={product} />
            <button
              onClick={open}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-5 rounded-lg w-100"
            >
              Virtual Try On
            </button>
          </div>
        </div>
        <Suspense>
          <RelatedProducts imageURL={product.images[0].url} />
        </Suspense>
      </div>
      <Suspense>{/* <Footer /> */}</Suspense>
    </>
  );
}

function RelatedProducts({ imageURL }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log(imageURL)
    axios.post("http://localhost:8080/related-products/5", { image_url: imageURL })
      .then(({ data }) => setRelatedProducts(data.map((item) => item.data)))
      .catch((err) => console.log(err))
  }, []);





  if (!relatedProducts.length) return null;


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
              <GridTileImage
                alt={product.title}
                active={false}
                label={{
                  title: product.title,
                  amount: product.discountedPrice,
                  currencyCode:
                    "INR",
                }}
                src={product.styleImages.default.imageURL}
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
