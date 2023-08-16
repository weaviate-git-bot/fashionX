"use client";
import { AppShell, Navbar, Header, Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


import NavbarComponents from "./NavbarComponents";
import { auth, provider } from "../firebase";
import axios from "axios";


const NavbarComponent = ({ children }) => {
  "use client"

  const createCheckout = async () => {
    const { data } = await axios.post("http://localhost:8080/create-checkout-session",
      { items: JSON.parse(localStorage.getItem("cart")) }
    )
    window.location = data.url
  }

  const [cartOpened, { open: cartopen, close: cartclose }] = useDisclosure(false);
  return (
    <>
      <Drawer
        opened={cartOpened}
        onClose={cartclose}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="right"
        size="lg"
      >
        {localStorage && JSON.parse(localStorage.getItem("cart")).map((item) => (
          <>
            {item.productName}
            <br />
            {item.productPrice}
            <br />
            <img height="10rem" width="10rem" src={item.productImage} />
            <br />
          </>))}

        <Button onClick={createCheckout}>Buy</Button>
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
            <NavbarComponents cartopen={cartopen} auth={auth} provider={provider} />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: "transparent",
          },
        })}
      >
        {/* Your application here */}
        {children}
      </AppShell>
    </>
  );
};

export default NavbarComponent;
