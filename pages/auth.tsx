import React, { useCallback, useState } from "react";
import Input from "../components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpg')]
                     bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />

          <div className="flex justify-center">
            <div
              className="bg-black bg-opacity-70 px-16 py-16 self-center 
                                      mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
            >
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant == "login" ? "Giriş Yap" : "Kayıt Ol"}
              </h2>

              <div className="flex flex-col gap-4">
                {variant == "register" && (
                  <Input
                    id="name"
                    label="Kullanıcı adı"
                    onChange={(e: any) => setName(e.target.value)}
                    type="name"
                    value={name}
                  />
                )}

                <Input
                  id="email"
                  label="E-posta"
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
                <Input
                  id="Password"
                  label="Şifrenizi girin"
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white font-medium rounded-md 
                                 w-full mt-10 hover:bg-red-700 transation"
              >
                {variant == "login" ? "Giriş Yap" : "Kaydol"}
              </button>
              <p className="text-neutral-500 mt-6">
                {variant == "login"
                  ? "Netflix'e katılmak ister misin?"
                  : "Netflix hesabın var mı?"}
                <span
                  onClick={toggleVariant}
                  className="text-white font-medium ml-1 hover:underline cursor-pointer"
                >
                  {variant == "login" ? "Şimdi kaydolun" : "Giriş kapın"}
                </span>
                .
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default auth;
