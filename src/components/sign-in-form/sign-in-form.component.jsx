//  Hooks
import { useState } from "react"

// Utilities
import {
  authenticatUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Styles
import './sign-in-form.styles.scss'

const defaultFormFields = {
  'email': '',
  'password': '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await authenticatUserWithEmailAndPassword(email, password)
    } catch (error) {
      if(error.code === 'auth/invalid-credential'){
        alert('Incorrect Email/Password')
      }
      console.log("User Creation: An Error Has Occurred", error)
    }
    resetFormFields();
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In With Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={'Email'} type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label={'Password'} type="password" required onChange={handleChange} name="password" value={password} />
        <div className="buttons-container">
          <Button type="submit">Log In</Button>
          <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm