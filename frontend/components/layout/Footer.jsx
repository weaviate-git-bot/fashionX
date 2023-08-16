import Link from "next/link";

import FooterMenu from "./footer-menu";
// import LogoSquare from "components/logo-square";
// import { getMenu } from "lib/shopify";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate =
    2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";
  // const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer
      className="text-sm text-neutral-500 dark:text-neutral-400"
      style={{ position: "absolute", width: "inherit" }}
    >
      <div className="border-t border-neutral-200 py-6 text-lg dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 xl:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in India</p>
          <p className="md:ml-auto">
            Crafted by{" "}
            <a
              href="https://github.com/saswatsam786/fashionX"
              className="text-black dark:text-white"
            >
              {COMPANY_NAME || "Fashion-X Inc."}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
