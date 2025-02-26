import FormItemTypes from "../../constants/FormItemTypes";
import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";

export default function Form({ items, form, handleChange, children }) {
  if (!form) return "Form props required";
  const { values, errors, touched } = form;

  const isFieldValid = (name) => Boolean(errors[name]) && touched[name];
  const getErrorMessage = (name) => isFieldValid(name) && errors[name];

  return (
    <Box component={"form"} noValidate autoComplete="off">
      {items.map((item) => {
        switch (item.type) {
          case FormItemTypes.TextField:
            return (
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                value={values[item.name]}
                disabled={item.disabled}
                key={item.name}
                name={item.name}
                id={item.name}
                label={item.label}
                onChange={handleChange}
                error={isFieldValid(item.name)}
                helperText={getErrorMessage(item.name)}
                required={item.required}
              />
            );
          case FormItemTypes.SelectBox:
            return (
              <TextField
                fullWidth
                select
                sx={{ mb: 2 }}
                value={values[item.name]}
                disabled={item.disabled}
                key={item.name}
                name={item.name}
                id={item.name}
                label={item.label}
                onChange={handleChange}
                error={isFieldValid(item.name)}
                helperText={getErrorMessage(item.name)}
                required={item.required}
              >
                {item?.items?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          case FormItemTypes.CheckBox:
            return (
              <FormControlLabel
                sx={{ mb: 2, width: "100%" }}
                key={item.name}
                control={
                  <Checkbox
                    checked={values[item.name]}
                    disabled={item.disabled}
                    name={item.name}
                    id={item.name}
                    onChange={handleChange}
                    required={item.required}
                  />
                }
                label={item.label}
              />
            );
          default:
            break;
        }
      })}
      {children}
    </Box>
  );
}
