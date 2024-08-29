import { IProductsListData } from "@/app/interfaces/response/productsList.response";
import { Button, Dropdown, Form, Input, MenuProps, notification } from "antd";
import React, { useCallback, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { MdSearch } from "react-icons/md";
import { debounce } from "lodash";
import { IBaseResponse } from "@/app/interfaces/response/baseResponse";
import { StatusCodes } from "http-status-codes";
import { RiStockFill } from "react-icons/ri";
import { ProductFilterType } from "@/app/enums/productFilterType";

const SearchProducts = ({
  setProductsList,
  setProductsLoader,
  refetchProducts,
}: {
  setProductsList: (data: IProductsListData[]) => void;
  setProductsLoader: (value: boolean) => void;
  refetchProducts: (values?: ProductFilterType) => void;
}) => {
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<ProductFilterType | null>(
    null
  );
  const items: MenuProps["items"] = [
    {
      key: ProductFilterType.STOCKS,
      label: <p className="text-base">In Stock</p>,
      icon: <RiStockFill className="!text-base text-green-500" />,
      onClick: () => {
        refetchProducts(ProductFilterType.STOCKS);
        setActiveFilter(ProductFilterType.STOCKS);
      },
    },
    {
      key: ProductFilterType.A_TO_Z,
      label: <p className="text-base">Alphabetically (A to Z)</p>,
      icon: <RiStockFill className="!text-base text-green-500" />,
      onClick: () => {
        refetchProducts(ProductFilterType.A_TO_Z);
        setActiveFilter(ProductFilterType.A_TO_Z);
      },
    },
    {
      key: ProductFilterType.Z_TO_A,
      label: <p className="text-base">Alphabetically (Z to A)</p>,
      icon: <RiStockFill className="!text-base text-green-500" />,
      onClick: () => {
        refetchProducts(ProductFilterType.Z_TO_A);
        setActiveFilter(ProductFilterType.Z_TO_A);
      },
    },

    ...(activeFilter
      ? [
          {
            key: "Reset",
            label: <p className="text-base">Reset</p>,
            icon: <RiStockFill className="!text-base text-green-500" />,
            onClick: () => {
              refetchProducts();
              setActiveFilter(null);
            },
          },
        ]
      : []),
  ];
  const searchProduct = debounce(async (value: string) => {
    setProductsLoader(true);
    try {
      let response = await fetch("/api/products/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });
      let responseJSON: IBaseResponse = await response.json();

      if (responseJSON.status === StatusCodes.OK) {
        setProductsList(responseJSON.data);
      } else {
        notification.error({ message: responseJSON.message, type: "error" });
      }
    } catch (error) {
      console.log(error, "error");
    }
    setProductsLoader(false);
  }, 1000);

  return (
    <div className="flex justify-end">
      <div className="min-w-[25%] flex space-x-2">
        <Form
          name="basic"
          initialValues={{ quantity: 1 }}
          onFinish={() => {}}
          onFinishFailed={(error) =>
            console.log(error, "error on submit form!")
          }
          autoComplete="off"
        >
          <Form.Item
            name="Search"
            rules={[{ min: 3, message: "Minimum 3 letters required!" }]}
          >
            <Input
              size="large"
              onChange={(e) => {
                setActiveFilter(null);
                // setSearchedTerm(e.target.value);
                if (e.target.value.length > 2) searchProduct(e.target.value);
                else if (!e.target.value) refetchProducts();
              }}
              placeholder="Search here..."
              prefix={<MdSearch className="text-xl" />}
            />
          </Form.Item>
        </Form>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: items.map((item) => {
              if (item?.key === activeFilter)
                item.className = "!bg-[#1677ff] !text-[white]";
              return item;
            }),
          }}
          placement="bottomLeft"
        >
          <Button
            className={`${activeFilter && "!bg-[#1677ff] !text-white"} `}
            size="large"
            icon={<CiFilter className={"mx-6"} />}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default SearchProducts;
