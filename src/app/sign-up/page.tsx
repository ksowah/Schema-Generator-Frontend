"use client";

import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const schema = z.object({
  emailAddress: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Enter a valid name"),
});

const REGISTER = gql`
mutation RegisterUser($input: RegisterUserInput!) {
  user: registerUser(input: $input) {
    _id
    code
    fullName
    emailAddress
    createdAt
    updatedAt
  }
}
`;

export default function SignUpPage() {
  const [registerUser, { loading }] = useMutation(REGISTER);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const form = useForm({
    initialValues: {
      emailAddress: "",
      password: "",
      fullName: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values:any) => {
    try {
        console.log("started waii...", values)
      const {data} = await registerUser({
        variables: {input: {...values}},
      });

      if (data?.user?._id) {
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden dark:bg-gray-900">
      {/* Left Side (Form Section) */}
      <div className="flex flex-col h-full px-8 py-6 ">
        <div className="flex h-full w-full items-center justify-center px-4 overflow-hidden">
          <div className="w-full md:w-[60%] space-y-6 p-8">
            <Title className="text-xl md:text-3xl text-primary font-bold text-start dark:text-primary-200">
              Sign Up.
            </Title>
            <Text className="text-sm text-start ">
              Enter your credentials to sign up!
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-5">
              <TextInput
                label="Email"
                placeholder="mail@yourdomain.com"
                required
                {...form.getInputProps("emailAddress")}
              />

              <TextInput
                label="Full Name"
                placeholder="Kelvin Sowah"
                required
                {...form.getInputProps("fullName")}
              />

              <div className="relative">
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  required
                  {...form.getInputProps("password")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  label="Keep me logged in"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <div className="text-sm dark:text-primary-200">
                  Already have an Account?{" "}
                  <span
                    onClick={() => router.push("/")}
                    className="cursor-pointer text-primary-800 hover:underline"
                  >
                    Sign In
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                loading={form.submitting}
                disabled={form.submitting}
                className={cn(
                  "rounded-lg bg-primary text-white font-semibold transition duration-300",
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-primary",
                )}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side (Branding Section) */}
      <div className="hidden md:flex flex-col items-center justify-center h-full w-full bg-[url('/assets/some-bg.jpg')] bg-cover bg-center relative rounded-bl-[10rem] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 z-10"></div>
        <Image
          src="/assets/logo-white.svg"
          className="text-primary z-50"
          alt="logo"
          width={100}
          height={100}
        />

        <div className="bg-primary/10 z-50 border border-primary/20 px-6 py-3 flex flex-col items-center justify-center rounded-lg mt-6">
          <h1 className="text-xs text-white font-bold text-center">
            Learn more about Schema Creator on
          </h1>
          <Link
            href="https://schemacreator.com"
            className="text-white font-bold text-sm underline"
          >
            schemacreator.com
          </Link>
        </div>

        <div className="absolute z-50 bottom-6 flex space-x-6 text-white text-sm">
          <Text size="xs" className="text-center mt-4">
            © 2024 - {new Date().getFullYear()} Schema Creator. All Rights Reserved!
          </Text>
        </div>

        <Button
          onClick={toggleColorScheme}
          variant="subtle"
          className="absolute z-50 bottom-6 right-6 bg-white/20 p-2 h-12 w-12 rounded-full"
        >
          {colorScheme === "dark" ? (
            <SunIcon className="h-6 w-6 text-white" />
          ) : (
            <MoonIcon className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
