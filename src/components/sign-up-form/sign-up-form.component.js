import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./SignUpForm.scss";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!displayName && email && password === confirmPassword) return;
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(response.user, { displayName });
      //reset form values
      setFormFields(defaultFormFields);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign up here</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          onChange={handleChange}
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
