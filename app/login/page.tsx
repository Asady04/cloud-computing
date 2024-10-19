"use client"; // Pastikan ini ada di paling atas

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import React from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation"; // Menggunakan next/navigation
import { login } from "@/services/authService";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter(); // Menggunakan useRouter dari next/navigation

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
      // Redirect to dashboard or home
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-0">
      <Card className="px-2">
        <CardHeader>
          <h1 className="font-bold text-red-800 text-2xl">Login</h1>
        </CardHeader>
        <CardBody className="gap-3">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FontAwesomeIcon className="text-default-500" icon={faEye} />
                ) : (
                  <FontAwesomeIcon
                    className="text-default-500"
                    icon={faEyeSlash}
                  />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          {/* Tampilkan pesan error */}
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Link href="/register">
              <p className="text-red-800 text-sm">Don&apos;t have an account?</p>
            </Link>
            <Button
              variant="shadow"
              className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold"
              onClick={handleLogin} // Panggil handleLogin saat tombol diklik
              disabled={loading} // Nonaktifkan tombol saat loading
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
