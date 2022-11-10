import { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import Button from "../button/Button.component";
import FormInput from "../form-input/form-input.component";

import "./SignInForm.scss";

function SignInForm(props) {
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(password && email)) return;
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      //reset form fields
      setFormFields({ email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Sign in with your email and password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="text"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          type="text"
          required
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            buttonType="google-sign-in"
            onClick={signInWithGoogle}
          >
            Sign in with google popup
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
