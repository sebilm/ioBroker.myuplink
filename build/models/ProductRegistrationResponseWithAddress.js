"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ProductRegistrationResponseWithAddress_exports = {};
__export(ProductRegistrationResponseWithAddress_exports, {
  ProductRegistrationResponseWithAddress: () => ProductRegistrationResponseWithAddress
});
module.exports = __toCommonJS(ProductRegistrationResponseWithAddress_exports);
const _ProductRegistrationResponseWithAddress = class _ProductRegistrationResponseWithAddress {
  /**
   * Returns the attribute type map for the ProductRegistrationResponseWithAddress class.
   */
  static getAttributeTypeMap() {
    return _ProductRegistrationResponseWithAddress.attributeTypeMap;
  }
  /**
   * Constructs a new instance of the ProductRegistrationResponseWithAddress class.
   */
  constructor() {
  }
};
_ProductRegistrationResponseWithAddress.discriminator = void 0;
_ProductRegistrationResponseWithAddress.attributeTypeMap = [
  {
    name: "address",
    baseName: "address",
    type: "ProductRegistrationAddress",
    format: ""
  },
  {
    name: "serialNumber",
    baseName: "serialNumber",
    type: "string",
    format: ""
  },
  {
    name: "operatingHours",
    baseName: "operatingHours",
    type: "number",
    format: "int32"
  },
  {
    name: "installationDate",
    baseName: "installationDate",
    type: "Date",
    format: "date-time"
  },
  {
    name: "registrationDate",
    baseName: "registrationDate",
    type: "Date",
    format: "date-time"
  },
  {
    name: "warrantyEndDate",
    baseName: "warrantyEndDate",
    type: "Date",
    format: "date-time"
  },
  {
    name: "customerName",
    baseName: "customerName",
    type: "string",
    format: ""
  },
  {
    name: "userId",
    baseName: "userId",
    type: "string",
    format: "uuid"
  },
  {
    name: "userAddressId",
    baseName: "userAddressId",
    type: "string",
    format: "uuid"
  },
  {
    name: "servicePartnerId",
    baseName: "servicePartnerId",
    type: "number",
    format: "int32"
  },
  {
    name: "userEmail",
    baseName: "userEmail",
    type: "string",
    format: ""
  },
  {
    name: "systemAddressId",
    baseName: "systemAddressId",
    type: "string",
    format: "uuid"
  },
  {
    name: "installerName",
    baseName: "installerName",
    type: "string",
    format: ""
  },
  {
    name: "site",
    baseName: "site",
    type: "string",
    format: ""
  },
  {
    name: "modelName",
    baseName: "modelName",
    type: "string",
    format: ""
  },
  {
    name: "phone",
    baseName: "phone",
    type: "string",
    format: ""
  },
  {
    name: "productName",
    baseName: "productName",
    type: "string",
    format: ""
  }
];
let ProductRegistrationResponseWithAddress = _ProductRegistrationResponseWithAddress;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductRegistrationResponseWithAddress
});
//# sourceMappingURL=ProductRegistrationResponseWithAddress.js.map
