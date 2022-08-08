import { REMOVE_SHIPPING_CHARGES } from "../store/actionTypes/checkout";

export const checkProductIsSoftware = (products) => {
  const sku = [
    "620e0ce9064f5d001e545282",
    "620e0dbd064f5d001e545284",
    "620e0c6f064f5d001e545281",
    "629215203fd823001e63e239",
    "629216e03fd823001e63e23a",
  ];
  for (let i = 0; i < products.length; i++) {
    if (sku.includes(products[i].product._id)) {
      return true;
    }
  }
  return false;
};
