"use client";
import React from "react";
import Container from "../container";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { title: "Home", key: "/" },
    { title: "Products", key: "/products" },
  ];

  return (
    <div className="bg-white p-2 py-5 mb-6">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-base font-semibold medusa-font">
              Inventory System
            </p>
          </div>
          <div>
            <ul className="flex text-sm font-medium gap-x-6">
              {navItems.map((item) => (
                <li
                  className={
                    pathname === item.key
                      ? "underline text-[#1677ff] cursor-pointer"
                      : ""
                  }
                  key={item.key}
                >
                  <Link href={item.key}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
