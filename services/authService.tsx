// services/authService.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Sign in user
export const login = async (email: string, password: string) => {
  try {
    // Set persistence to 'local', meaning it persists even after a page refresh
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Sign up user
export const register = async (email: string, password: string, name: string, role: string, nim: string) => {
    try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
        // Get the registered user's UID
        const userId = userCredential.user.uid;
    
        // Store additional data in Firestore
        await setDoc(doc(db, "users", userId), {
          name,
          role,
          nim,
          email,
          createdAt: new Date(),
        });
    
        return userCredential; // Return userCredential for further use if needed
      } catch (error) {
        console.error("Error during registration:", error);
        throw error; // Rethrow the error for handling in the component
      }
};

export const fetchUserData = async () => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Document data exists
        return userDocSnap.data(); // Return the user's data
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      console.log("No user is signed in.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Sign out user
export const logout = async () => {
  return await signOut(auth);
};
