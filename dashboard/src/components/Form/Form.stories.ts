import Form from "./Form.jsx";
import FormItemTypes from "../../constants/FormItemTypes.js";

export default {
  title: "Nucleoid/Form",
  component: Form,
};

export const Normal = {
  args: {
    items: [
      {
        type: FormItemTypes.SelectBox,
        name: "city",
        label: "city",
        items: [
          { label: "City1", value: 0 },
          { label: "City2", value: 1 },
        ],
        required: true,
      },
      {
        type: FormItemTypes.TextField,
        name: "address",
        label: "address",
        required: true,
      },
    ],
    form: {
      values: { address: "", city: "" },
      errors: {},
      touched: {},
    },
  },
};

export const WithValues = {
  args: {
    items: [
      {
        type: FormItemTypes.SelectBox,
        name: "city",
        label: "city",
        items: [
          { label: "City1", value: 0 },
          { label: "City2", value: 1 },
        ],
        required: true,
      },
      {
        type: FormItemTypes.TextField,
        name: "address",
        label: "address",
        required: true,
      },
    ],
    form: {
      values: { address: "Address 1", city: 1 },
      errors: {},
      touched: {},
    },
  },
};
