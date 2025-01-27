import { Button } from "@mui/material";
import Form from "../components/Form";
import FormItemTypes from "../constants/FormItemTypes";
import FullScreenLayout from "../layouts/FullScreenLayout";
import React from "react";
import api from "../http/index";
import { useFormik } from "formik";

import * as Yup from "yup";

export default function Address() {
  const validationForm = Yup.object().shape({
    company: Yup.string().required("required"),
    contact: Yup.string().required("required"),
    city: Yup.number().required("required"),
    address: Yup.string().required("required"),
    email: Yup.string().email().required("required"),
  });

  const form = useFormik({
    initialValues: {
      company: "",
      contact: "",
      city: "",
      address: "",
      email: "",
      validate: false,
      send: true,
    },
    validationSchema: validationForm,
    onSubmit: async (values) => {
      const result = await api.post("/address", values);
      alert(JSON.stringify(result.data));
    },
  });

  const formItems = [
    {
      type: FormItemTypes.TextField,
      name: "company",
      label: "company",
      required: true,
    },
    {
      type: FormItemTypes.TextField,
      name: "contact",
      label: "contact",
      required: true,
    },
    {
      type: FormItemTypes.SelectBox,
      name: "city",
      label: "city",
      required: true,
      items: [
        { label: "-Not selected-", value: 0 },
        { label: "Ankara", value: 6 },
        { label: "İstanbul", value: 34 },
        { label: "İzmir", value: 35 },
      ],
    },
    {
      type: FormItemTypes.TextField,
      name: "address",
      label: "address",
      required: true,
    },
    {
      type: FormItemTypes.TextField,
      name: "email",
      label: "email",
      required: true,
    },
    {
      type: FormItemTypes.CheckBox,
      name: "validate",
      label: "validate address",
      required: true,
    },
    {
      type: FormItemTypes.CheckBox,
      name: "send",
      label: "send email",
      required: true,
    },
  ];

  return (
    <FullScreenLayout title={"Address"}>
      <Form items={formItems} form={form} handleChange={form.handleChange}>
        <Button
          disabled={form.isSubmitting}
          onClick={form.handleSubmit}
          sx={{ backgroundColor: `secondary.main` }}
        >
          Save
        </Button>
        <Button
          onClick={form.handleReset}
          sx={{
            backgroundColor: "secondary.main",
            color: "primary.main",
            marginLeft: "20px",
          }}
        >
          Clear
        </Button>
      </Form>
    </FullScreenLayout>
  );
}
