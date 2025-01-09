import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export type UserData = {
    name: string;
    email: string;
    token: string;
};

export const registerUser = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      const userData ={
        name,
        email,
        token: await user.getIdToken(),
      }

      localStorage.setItem('user', JSON.stringify(userData));
  
      return userData;
    } catch (error: any) {
        return Promise.reject(JSON.stringify(error));
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;

      const userData ={
        name: user.displayName,
        email: user.email,
        token: await user.getIdToken(),
      }

      localStorage.setItem('user', JSON.stringify(userData));
  
      return userData;
    } catch (error: any) {
        return Promise.reject(JSON.stringify(error));
    }
};

export const logoutUser = async () => {
  localStorage.removeItem('user'); 

  return signOut(auth);
}