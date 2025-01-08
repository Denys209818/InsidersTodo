import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export type UserData = {
    name: string;
    token: string;
};

export const registerUser = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });
  
      return {
        name,
        token: await user.getIdToken(),
      };
    } catch (error: any) {
        return Promise.reject(JSON.stringify(error));
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
  
      return {
        name: user.displayName,
        token: await user.getIdToken(),
      };
    } catch (error: any) {
        return Promise.reject(JSON.stringify(error));
    }
};

export const logoutUser = async () => {
  return signOut(auth);
}