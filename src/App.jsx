import { useState } from "react";
import "./App.css";
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
  const [validation, setValidation] = useState({
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
    setInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = inputVal.name;
    // name
    if (!name) {
      setValidation((prev) => ({ ...prev, name: "Enter the name" }));
    } else if (name.trim().length < 2) {
      setValidation((prev) => ({ ...prev, name: "Enter full name" }));
    } else if (name.trim().match(/[0-9]/)) {
      setValidation((prev) => ({
        ...prev,
        name: "Name cannot contain number",
      }));
    } else {
      setValidation((prev) => ({ ...prev, name: "" }));
    }
    // email
    const emailCond =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (!inputVal.email.trim()) {
      setValidation((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!inputVal.email.match(emailCond)) {
      setValidation((prev) => ({ ...prev, email: "Enter valid email" }));
    } else {
      setValidation((prev) => ({ ...prev, email: "" }));
    }
    //mobile
    const mobile = inputVal.mobile;
    const phCond = /[0-9]/;
    if (mobile) {
      setValidation((prev) => ({ ...prev, mobile: "Enter mobile number" }));
    } else if (inputVal.mobile.length < 10 || inputVal.mobile.length > 10) {
      setValidation((prev) => ({ ...prev, mobile: "Enter valid number" }));
    } else if (!inputVal.mobile.trim().match(phCond)) {
      setValidation((prev) => ({
        ...prev,
        mobile: "Ph number cannot contain letters",
      }));
    } else {
      setValidation((prev) => ({ ...prev, mobile: "" }));
    }

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
        setValidation((prev) => ({ ...prev, country: "" }));
        for (
          let indexb = 0, stateFound = false;
          indexb < cs.countries[index].states.length && stateFound === false;
          indexb++
        ) {
          if (
            cs.countries[index].states[indexb].toLowerCase() ===
            inputVal.state.trim().toLowerCase()
          ) {
            setValidation((prev) => ({ ...prev, state: "" }));
            stateFound = true;
          } else {
            setValidation((prev) => ({ ...prev, state: "State name invalid" }));
          }
        }
      } else {
        setValidation((prev) => ({ ...prev, state: "State invalid" }));
        setValidation((prev) => ({ ...prev, country: "Country invalid" }));
      }
    }
  };

  return (
    <div className="FormContainer">
      <form className="FormWrapper">
        <div className="FormTitleContainer">
          <h1 className="FormTitle">Registration</h1>
        </div>
        <div className="InputsContainer">
          <div className="Inputs">
            <div className="InputContainer">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
              {validation.name && <span>{validation.name}</span>}
            </div>
            <div className="InputContainer">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
              {validation.name && <span>{validation.email}</span>}
            </div>
            <div className="InputContainer">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
              {validation.name && <span>{validation.mobile}</span>}
            </div>
            <div className="InputContainer">
              <label>Country</label>
              <input
                type="text"
                name="country"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
              {validation.name && <span>{validation.country}</span>}
            </div>
            <div className="InputContainer">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
              {validation.name && <span>{validation.state}</span>}
            </div>
            <div className="InputContainer">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="InputArea"
                value={inputVal.value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="TextBox">
            <textarea
              name="message"
              value={inputVal.message}
              className="TextArea"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="FormSubmit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
