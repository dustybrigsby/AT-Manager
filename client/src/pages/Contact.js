import { useState } from "react";
import { validateEmail } from "../utils/helpers";
import { TextField, Button, Grid, Typography } from "@mui/material";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [value, setValue] = useState("");
  const [fieldName, setfieldName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [messageHelperText, setMessageHelperText] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValue(e.target.value);
    setfieldName(e.target.name);
    console.log("Form submitted", formData);
  };

  const validateInput = () => {
    if (fieldName === "email" && value) {
      if (!validateEmail(value)) {
        setEmailError(true);
        setEmailHelperText("Valid email required");
      } else {
        setEmailError(false);
        setEmailHelperText("");
      }
    } else if (fieldName === "name") {
      if (!value) {
        setNameError(true);
        setNameHelperText("Name should contain some text");
      } else {
        setNameError(false);
        setNameHelperText("");
      }
    } else if (fieldName === "message") {
      if (!value) {
        setMessageError(true);
        setMessageHelperText("Message should contain some text");
      } else {
        setMessageError(false);
        setMessageHelperText("");
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!nameError && !emailError && !messageError) {
      console.log("Form Submitted", formData);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography>Hello {formData.name}</Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={nameError}
          helperText={nameHelperText}
          onBlur={validateInput}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={emailError}
          helperText={emailHelperText}
          onBlur={validateInput}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          id="message"
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          error={messageError}
          helperText={messageHelperText}
          onBlur={validateInput}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Grid>
  );
}

export default Contact;
