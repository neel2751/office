"use client";
import React, { useState } from "react";
import { LOGINFIELD } from "@/allFormField/field";
import { ReactHookForm } from "../ModelForm/FormModel";
import { signIn, useSession } from "next-auth/react";
import AuthProvider from "../AuthProvider/AuthProvider";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  return (
    <AuthProvider>
      <LoginUI />
    </AuthProvider>
  );
};

export default LoginForm;

const LoginUI = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  const callBackcheck = callback ? callback : process.env.NEXTAUTH_URL || "/";
  const [resetFlag, setResetFlag] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSession();
  if (status === "authenticated") {
    window.location.href = callBackcheck;
  }

  const onAuth = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: callBackcheck,
        email: data.email,
        password: data.password,
      });
      if (res?.error) {
        toast.error(`${res.error}`, {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        window.location.href = res.url || callBackcheck || "/";
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <main className="w-full max-w-md mx-auto p-6 h-full">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div>
            <div className="flex  items-center gap-3">
              <img className="h-10 w-10" src="/images/Logo.svg" />
              <span className="text-gray-800 font-semibold text-lg">
                Creative Design & Construction.
              </span>
            </div>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6">
              Login
            </div>
            <div className="grid gap-y-4 text-gray-600">
              <ReactHookForm
                fields={LOGINFIELD}
                setResetFlag={setResetFlag}
                onSubmit={onAuth}
                resetFlag={resetFlag}
                btnName={"Login"}
              />
            </div>
            {error && (
              <div className="text-red-800 bg-red-100 text-sm font-medium p-2 rounded">
                {error && error}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
