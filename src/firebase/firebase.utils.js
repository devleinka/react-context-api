import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB_tXU03IN59Z6YP0rud6ey9Mu9-30-C64",
  authDomain: "ecommerce-demo-db-73c9b.firebaseapp.com",
  databaseURL: "https://ecommerce-demo-db-73c9b.firebaseio.com",
  projectId: "ecommerce-demo-db-73c9b",
  storageBucket: "ecommerce-demo-db-73c9b.appspot.com",
  messagingSenderId: "1093260398530",
  appId: "1:1093260398530:web:ad12428df8f8d5f99fd05b"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
