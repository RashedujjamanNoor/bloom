import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googlProvider } from "../../firebase/firebase.config";

//Google Login
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googlProvider);

  return result.user;
};

//Regiseter

export const firebaseRegister = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  return result.user;
};

export const firebaseLogout = async () => {
  await signOut(auth);
};
