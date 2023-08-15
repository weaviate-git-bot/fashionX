"use client";
import { AppShell, Navbar, Header } from "@mantine/core";

import NavbarComponents from "./NavbarComponents";
import { auth, provider } from "../firebase";

const NavbarComponent = ({ children }) => {
  return (
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
          <NavbarComponents auth={auth} provider={provider} />
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
  );
};

export default NavbarComponent;
