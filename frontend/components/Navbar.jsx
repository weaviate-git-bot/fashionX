"use client";
import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Drawer,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";

import NavbarComponents from "./NavbarComponents";
import { auth, provider } from "../firebase";
import axios from "axios";
import {
  IconEdit,
  IconShoppingBag,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import Price from "./Price";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

const NavbarComponent = ({ children }) => {
  "use client";
  const [items, setItems] = useState([]);
  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("cart")) || [];
    setItems(storedItems);
  }, [localStorage.getItem("cart")]);

  const createCheckout = async () => {
    const { data } = await axios.post(
      "http://localhost:8080/create-checkout-session",
      { items: JSON.parse(localStorage.getItem("cart")) }
    );
    window.location = data.url;
  };

  const total = () => {
    let total = 0;
    JSON.parse(localStorage.getItem("cart")).map((item) => {
      total = total + item.productPrice;
    });
    return total;
  };

  const deleteItem = (id) => {
    toast.loading("Removing item from cart");
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndexDelete = items.findIndex(
      (item) => item.productID === id
    );
    if (itemIndexDelete !== -1) {
      items.splice(itemIndexDelete, 1);
      localStorage.setItem("cart", JSON.stringify(items));
      const cart = JSON.parse(localStorage.getItem("cart"));
      setItems(cart);
      toast.dismiss();
      toast.success("Item removed from cart");
    } else {
      console.log("Error");
      toast.dismiss();
      toast.error("Error removing item from cart");
    }

    // if (itemIndexDelete !== -1) {
    //   items.splice(itemIndexDelete, 1);
    //   localStorage.setItem('items', JSON.stringify(items));
    // }
  };

  const [cartOpened, { open: cartopen, close: cartclose }] =
    useDisclosure(false);
  return (
    <>
      <Drawer
        opened={cartOpened}
        onClose={cartclose}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="right"
        size="lg"
      >
        {items.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <IconShoppingBag size="40" />
            <p className="mt-6 text-center text-2xl font-bold">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {items?.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="absolute z-40 -mt-2 ml-[41px]">
                        <button
                          aria-label="Remove cart item"
                          disabled={
                            localStorage.getItem("cart") === 0
                          }
                          className={clsx(
                            "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
                          )}
                        >
                          <IconX
                            onClick={() => deleteItem(item.productID)}
                            className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"
                          />
                          {/* // )} */}
                        </button>
                      </div>
                      <Link
                        href={""}
                        // onClick={closeCart}
                        className="z-30 flex flex-row space-x-4"
                      >
                        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <img
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt={item.productName}
                            src={item.productImage}
                          />
                        </div>

                        <div className="flex flex-1 flex-col text-base">
                          <span className="leading-tight">
                            {item.productName}
                          </span>
                        </div>
                      </Link>
                      <div className="flex h-16 flex-col justify-between">
                        <Price
                          className="flex justify-end space-y-2 text-right text-sm"
                          amount={item.productPrice}
                          currencyCode="INR"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <div className="text-right text-base text-black dark:text-white">
                  {total()} INR
                </div>
              </div>
            </div>
            <button
              onClick={createCheckout}
              className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </Drawer>

      <AppShell
        padding="md"
        height="100vh"
        header={
          <Header
            height={100}
            p="xs"
            className="flex justify-between items-center pl-5 pr-5"
          >
            {/* Header content */}
            <NavbarComponents
              cartopen={cartopen}
              auth={auth}
              provider={provider}
            />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: "transparent",
          },
        })}
      >
        {/* Your application here */}
        <Toaster />
        {children}
      </AppShell>
    </>
  );
};

export default NavbarComponent;
