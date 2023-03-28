import React, { FC } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useAction } from "../../hooks/useTypesStore";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreateProductProps {
  show: boolean;
  onHide: () => void;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "must be at least 3 characters long")
    .required("Field is required"),
  description: yup
    .string()
    .min(3, "must be at least 3 characters long")
    .required("Field is required"),
  price: yup.number().required("Field is required"),
  rating: yup.number().required("Field is required"),
});

const CreateProduct: FC<CreateProductProps> = ({ show, onHide }) => {
  const { productsAddProducts } = useAction();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      productsAddProducts({
        //Just for test - do not use in real project
        id: uuidv4(),
        title: values.title,
        description: values.description,
        price: values.price,
        rating: values.rating,
        thumbnail: "",
        stock: 0,
        category: "device",
      });
      onHide();
      resetForm();
    },
  });

  return (
    <Modal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new product
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            type="number"
            id="price"
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            type="number"
            id="rating"
            name="rating"
            label="Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProduct;
