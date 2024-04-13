import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCJwE6jCO8D-Z4A5cTRSnEOU3nyf8ax3qQ",
  authDomain: "imperial-clothing-db.firebaseapp.com",
  projectId: "imperial-clothing-db",
  storageBucket: "imperial-clothing-db.appspot.com",
  messagingSenderId: "74377023052",
  appId: "1:74377023052:web:7a524980a3b586dbdc2ee9"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDockRef = doc(db, 'users', userAuth.uid)
  console.log(userDockRef)

  const userSnapShot = await getDoc(userDockRef)
  console.log(userSnapShot)

  if(!userSnapShot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDockRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating the user', error)
    }
  }

  return userDockRef
}
