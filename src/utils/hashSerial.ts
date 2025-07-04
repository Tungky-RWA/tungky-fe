import { ethers } from "ethers";

export const hashSerial = (serialNumber: string) => {
  const sku = ethers.toUtf8Bytes(serialNumber);
  const skuHash = ethers.keccak256(sku);
  return BigInt(skuHash);
};
