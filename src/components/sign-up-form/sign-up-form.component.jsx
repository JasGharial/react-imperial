//  Hooks
import { useState } from "react"

// Utilities
import { createAuthUserwithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Styles
import './sign-up-form.styles.scss'

const defaultFormFields = {
  'displayName': '',
  'email': '',
  'password': '',
  'confirmPassword': ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      console.log('Password and Confirm Password Mismatch')
      return;
    }

    try {
      const { user } = await createAuthUserwithEmailAndPassword(email, password)

      const saveUserDocForm = await createUserDocumentFromAuth(user, {displayName})
      console.log(saveUserDocForm);
    } catch (error) {
      console.log("User Creation: An Error Has Occurred", error)
    }
    resetFormFields();
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={'Display Name'} type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <FormInput label={'Email'} type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label={'Password'} type="password" required onChange={handleChange} name="password" value={password} />
        <FormInput label={'Confirm Password'} type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm