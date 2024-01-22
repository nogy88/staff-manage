"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import {
  Spacer,
  Button,
  Input,
  Checkbox,
} from '@nextui-org/react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const formLogin = async () => {
    try {
      setLoading(true);
      // const res = await login({ email, password });
      // if (res?.JWT) {
      //   localStorage.setItem("token", JSON.stringify(res.JWT));
      //   // toast.success("Амжилттай нэвтэрлээ.");

      //   router.push("/dashboard");
      // }
    } catch (error) {
      // toast.error(error.message);
      setLoading(false);
    }
  };

  



  return (
    <div
      className="flex justify-center"
      style={{
        height: "100vh",
      }}
    >
      <div className="md:w-[400px] sm:w-full h-screen flex flex-col justify-center items-center backdrop-blur bg-slate-500 ">
      
        <form
          onSubmit={formLogin}
          className="shadow-2xl bg-white hover:shadow-zinc-400 p-10 rounded-xl
          flex flex-col gap-4 xl:w-[400px]"
        >
            <h1 className="text-2xl font-semibold">Нэвтрэх</h1>
        <Spacer y={2} />
        <Input
          type="email"
          label="Email"
          variant="bordered"
          color="warning"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer y={2} />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          color="warning"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                // <EyeIcon className="h-6 w-6" />
                <div>eye</div>
              ) : (
                // <EyeIcon className="h-6 w-6" />
                <div>eye2</div>

              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-row">
          <Checkbox>
            <div >Remember me</div>
          </Checkbox>
          <div>Forgot password?</div>
        </div>
        <Spacer y={2} />
        <Button>Sign in</Button>
        </form>
      </div>
    </div>
  );
}
