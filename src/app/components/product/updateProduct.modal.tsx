import React, { useState } from "react";
import ProductForm from "./form";
import { Divider, Modal, notification } from "antd";
import { StatusCodes } from "http-status-codes";
import { IBaseResponse } from "@/app/interfaces/response/baseResponse";
import { IProductRequestPayload } from "@/app/interfaces/request/product.request";
import { IProductsListData } from "@/app/interfaces/response/productsList.response";
import { FormType } from "@/app/enums/formType";
type UpdateProductModalProps = {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  title?: string;
  refetchProducts: () => void;
  initialProduct: IProductsListData;
};

const UpdateProductModal = ({
  isShowModal,
  setIsShowModal,
  title,
  refetchProducts,
  initialProduct,
}: UpdateProductModalProps) => {
  const [updateProductLoading, setUpdateProductLoading] =
    useState<boolean>(false);

  const handleUpdateProduct = async (values: IProductRequestPayload) => {
    setUpdateProductLoading(true);
    try {
      let response = await fetch("api/products", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: initialProduct._id }),
      });
      let responseJSON: IBaseResponse = await response.json();

      if (responseJSON.status === StatusCodes.OK) {
        notification.success({ message: "Success!", type: "success" });
        refetchProducts();
        setIsShowModal(false);
      } else
        notification.error({ message: responseJSON.message, type: "error" });
    } catch (error) {
      console.log(error, "error");
    }
    setUpdateProductLoading(false);
  };

  return (
    <Modal
      footer={null}
      width={600}
      title={title ?? "Update Product"}
      open={isShowModal}
      onCancel={() => setIsShowModal(false)}
      onClose={() => setIsShowModal(false)}
    >
      <Divider />
      <ProductForm
      formType={FormType.UPDATE}
        initialProduct={initialProduct}
        handleCloseForm={() => setIsShowModal(false)}
        loading={updateProductLoading}
        handleSubmitForm={handleUpdateProduct}
      />
    </Modal>
  );
};

export default UpdateProductModal;
