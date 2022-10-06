import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import cs from "./cs.json";
function App() {
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  // ==========================================
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    message: "",
  });

  const handleSubmit = async () => {
    console.log("clicked");
    const errors = validation;
    const { name, mobile } = inputVal;
    if (!name.trim()) {
      errors.name = "Please enter the name";
    } else if (name.trim().length < 2) {
      errors.name = "Enter full name";
    } else if (name.trim().match(/[0-9]/)) {
      errors.name = "Name cannot contain numbers";
    } else errors.name = "";
    //email
    const emailCond =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (!inputVal.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputVal.email.match(emailCond)) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }
    //password
    const phCond = /[0-9]/;
    if (!mobile.trim()) {
      errors.mobile = "Enter a mobile number";
    } else if (mobile.trim().length < 10 || mobile.trim().length > 10) {
      errors.mobile = "Enter a valid 10 digits mobile number";
    } else if (!mobile.trim().match(phCond)) {
      errors.mobile = "Mobile number should be in numbers";
    } else errors.mobile = "";

    for (
      let index = 0, countryFound = false;
      index < cs.countries.length && countryFound === false;
      index++
    ) {
      if (
        inputVal.country.toLowerCase() ===
        cs.countries[index].country.toLowerCase()
      ) {
        countryFound = true;
        errors.country = "";
        for (
          let indexb = 0, stateFound = false;
          indexb < cs.countries[index].states.length && stateFound === false;
          indexb++
        ) {
          if (
            cs.countries[index].states[indexb].toLowerCase() ===
            inputVal.state.trim().toLowerCase()
          ) {
            errors.state = "";
            stateFound = true;
          } else {
            errors.state = "State name invalid";
          }
        }
      } else {
        errors.country = "Country name invalid";
        errors.state = "Please check country name";
      }
    }
    setValidation(errors);
  };

  return (
    <div className="FormContainer">
      <div className="FormWrapper">
        <div className="FormTitleContainer">
          <h1 className="FormTitle">Registration</h1>
        </div>
        <div className="InputsContainer">
          <div className="Inputs">
            <Input
              name="name"
              value={inputVal.name}
              onChange={handleChange}
              span={validation.name}
            ></Input>
            <Input
              name="email"
              value={inputVal.email}
              onChange={handleChange}
              span={validation.email}
            ></Input>
            <Input
              name="mobile"
              value={inputVal.mobile}
              onChange={handleChange}
              span={validation.mobile}
            ></Input>
            <Input
              name="country"
              value={inputVal.country}
              onChange={handleChange}
              span={validation.country}
            ></Input>
            <Input
              name="state"
              value={inputVal.state}
              onChange={handleChange}
              span={validation.state}
            ></Input>
            <Input
              name="city"
              value={inputVal.city}
              onChange={handleChange}
              span={validation.city}
            ></Input>
          </div>
          <div className="TextBox">
            <textarea
              name="message"
              value={inputVal.message}
              className="TextArea"
              onChange={handleChange}
              span={validation.message}
            ></textarea>
          </div>
        </div>
        <button className="FormSubmit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
