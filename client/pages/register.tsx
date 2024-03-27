import axios from "axios";
import InputGroup from "@/components/InputGroup";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();
  const handleSubmit = async (event: FormEvent) => {
    // 기존에는 form에 onSubmit 이벤트 발생하면(클릭 시) 페이지가 refresh 된다.
    // preventDefault() 함수는 페이지 refresh 동작을 막아주는 역할을 한다.
    event.preventDefault();

    // 비동기 요청 시 try-catch 문으로 잡아준다.
    try {
      const res = await axios.post("/auth/register", { // axios 이용하여 post 요청
        email,
        password,
        username,
      });
      console.log("res", res);
      // router.push("/login"); // 로그인 페이지로 이동
    } catch (error: any) {
      console.log("error", error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium text-black">회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            F
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              회원가입
            </button>
          </form>
          <small className="text-black">
            이미 가입하셨나요?
            <Link href="/login" legacyBehavior>
              <a className="ml-1 text-blue-500 uppercase">로그인</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
