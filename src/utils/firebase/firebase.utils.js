import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore"

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

export const addCollectionDocuments = async (collectionKey, objectsToAdd) => {
  const collectionReference = collection(db, collectionKey);
  const batch =  writeBatch(db);

  //  Read and Push The Categories to Firebase DB
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionReference, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  // Commit Transaction
  await batch.commit();
  console.log('DB Importing Done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionReference = collection(db, 'categories');
  const q = query(collectionReference);

  const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDockRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDockRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDockRef, { displayName, email, createdAt, ...additionalInformation });
    } catch (error) {
      console.log('Error creating the user', error)
    }
  }

  return userDockRef
}

export const createAuthUserwithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const authenticatUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
