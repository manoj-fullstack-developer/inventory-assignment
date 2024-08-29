"use client";
import { Button } from "antd";
import Link from "next/link";
import Container from "./components/shared/container";

export default function Home() {
  return (
    <main>
      <Container>
        <div className="flex justify-center  flex-col items-center h-screen medusa-font">
          <h1 className="lg:text-4xl md:text-2xl sm:text-lg text-base font-medium text-center">
            Welcome to Inventory Management System!
          </h1>
          <br />
          <Link href={"/products"}>
            <Button type="primary" size="large" className="px-10 mt-2">
              Continue
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
