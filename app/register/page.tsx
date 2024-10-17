"use client";
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
export default function PricingPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 md:px-0">
      <Card className="px-2">
        <CardHeader>
          <h1 className="font-bold text-red-800 text-2xl">Registration</h1>
        </CardHeader>
        <CardBody className="gap-3">
          <Input type="email" label="Email" />
          <Input type="text" label="Name" />
          <Input type="text" label="NIM" />
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
          />
          <Input type="password" label="Password Confirmation" />
        </CardBody>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Link href="/login">
              <p className="text-red-800 text-sm">Already have an account?</p>
            </Link>

            <Button
              variant="shadow"
              className="bg-gradient-to-r from-red-800 to-red-600 text-white font-semibold"
            >
              Register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
