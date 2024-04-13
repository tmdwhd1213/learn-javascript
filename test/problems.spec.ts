import { expect } from "chai";
import getLowestPrice from "../src/problems";

describe("getLowestPrice", () => {
  it("should return 0 when inventory is 0", () => {
    const item = {
      inventory: 0,
      price: 3,
      salePrice: 0,
      saleInventory: 0,
    };
    expect(getLowestPrice(item)).to.equal(0);
  });

  it("should return 2 when it sale and saleInventory is available", () => {
    const item = {
      inventory: 3,
      price: 3,
      salePrice: 2,
      saleInventory: 1,
    };
    expect(getLowestPrice(item)).to.equal(2);
  });

  it("should return price when sale is not active or saleInventory is not available", () => {
    const item = {
      inventory: 3,
      price: 3,
      salePrice: 2,
      saleInventory: 0,
    };
    expect(getLowestPrice(item)).to.equal(3);
  });
});
