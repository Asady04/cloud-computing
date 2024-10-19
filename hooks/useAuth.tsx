// hooks/useAuth.ts
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state to wait for Firebase to check the user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if no user is authenticated
      }
      setLoading(false); // Done checking authentication state
    });

    return () => unsubscribe();
  }, [router]);

  // return loading; // Return loading status
};

export default useAuth;
