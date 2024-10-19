'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig"; // Or wherever auth is imported

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this code only runs on the client-side
      const checkUser = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          router.push("/login"); // Only redirect if user is not authenticated
        } else {
          // setUser(currentUser);
        }
        setLoading(false);
      };

      checkUser();
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  // return <div>Welcome to the dashboard, {user?.email}</div>;
  return null;
};

export default DashboardPage;
