import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./Authentication.scss";

function Authentication(props) {
  return (
    <div className="authtentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
