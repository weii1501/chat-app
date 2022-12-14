import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import userContext from "../utils/userContext";
import OpenNotification from "../components/OpenNotification";
import { login, signup } from "../api";

import { AiTwotoneMail } from "react-icons/ai";
import axios from "axios";
import { useAlert } from "react-alert";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {
  
  const { refetch, isAlert, setIsAlert } = useContext<any>(userContext);

  const navigate = useNavigate();

  const [isLoginToggled, setIsLoginToggled] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('')

  const option = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }


  interface signup {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  }

  interface login {
    username: string;
    password: string;
  }

  const [signupInfo, setSignupInfo] = useState<signup>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState<login>({
    username: "",
    password: "",
  });

  const redirection = (token: string) => {
    localStorage.setItem("token", token);
    refetch();
    navigate("/");
  };

  const handleLogin = useMutation((data: login) => login(data), {
    onSuccess: (res) => {
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: res.message,
        type: "success",
      });
      redirection(res.token);
      
    },
    onError: (err: any) =>
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: err.message,
        type: "failure",
      }),
      // {
      //   console.log(err.message)
      //   toast(err.message, toastOption)
      // }
      
  });

  const handleSignup = useMutation((data: signup) => signup(data), {
    onSuccess: (res) => {
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: res.message,
        type: "success",
      });
      // redirection(res.token);
      // console.log(res.message);
      setIsLoginToggled(true)
    },
    onError: (err: any) =>
      setIsAlert({
        ...isAlert,
        isOpen: true,
        title: err.message,
        type: "failure",
      }),
  });

  const onChange = (event: React.SyntheticEvent): void => {
    const { name, value } = event.target as HTMLButtonElement;
    isLoginToggled
      ? setLoginInfo({ ...loginInfo, [name]: value })
      : setSignupInfo({ ...signupInfo, [name]: value });
  };

  const alertReset = () => {
    const data = {
      email: email
    }
    axios.post('  http://localhost:8000/api/password_reset/', data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 'OK') {
          const message = 'Check your email!'
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log(res)
          const message = res.data.email
          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
  }

  return (
    <div className="min-h-screen w-screen flex font-sans items-center justify-center text-black bg-white">
      <ToastContainer/>
      <OpenNotification />
     
      <div className="md:w-[60rem] w-full md:h-[35rem] h-screen flex flex-col md:flex-row justify-between rounded-lg drop-shadow-lg shadow-lg">
        <div className="md:w-5/12 w-full md:h-full h-46 md:flex items-center justify-center bg-[#96b6c8] md:rounded-l-lg md:rounded-tr-none">
          <div className="md:h-40 h-32 flex flex-col justify-between items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Google_Chat_logo_%282017-2020%29.svg/2560px-Google_Chat_logo_%282017-2020%29.svg.png" 
              alt="" 
              style={{width: "350px"}}
            />
            <p className="font-dev text-[#FF6A3D] md:text-[14rem] text-9xl md:leading-3">
              
            </p>
            <p className="md:block hidden text-lg text-white text-center">

            </p>
          </div>
        </div>

        <div className="h-full md:w-[59.33%] w-full flex items-center justify-center bg-[white] md:rounded-r-lg md:rounded-bl-none">
          <form
            className="w-5/6 h-5/6 flex flex-col justify-between items-center"
            onSubmit={(event: React.SyntheticEvent): void => {
              event.preventDefault();
              isLoginToggled
                ? handleLogin.mutate(loginInfo)
                : handleSignup.mutate(signupInfo);
            }}
          >
            <div className="self-start flex justify-between text-sm font-semibold">
              <p
                className={`${
                  isLoginToggled ? "text-gray-300" : "text-[#1A2238]"
                } cursor-pointer`}
                onClick={(): void => setIsLoginToggled(false)}
              >
                Sign up
              </p>
              <p className="px-1 text-gray-300">/</p>
              <p
                className={`${
                  isLoginToggled ? "text-[#1A2238]" : "text-gray-300"
                } cursor-pointer`}
                onClick={(): void => setIsLoginToggled(true)}
              >
                Login
              </p>
            </div>

            <div className="w-full h-2/3 flex justify-between">
              <div className="w-2/5 h-full flex flex-col justify-between">
                <p
                  className={`text-[#1A2238] font-semibold md:text-base text-sm ${
                    isLoginToggled && "absolute"
                  }`}
                >
                  {isLoginToggled ? "LogIn" : "Signup"}
                </p>
                <div
                  className={`w-full ${
                    isLoginToggled && "h-full flex flex-col justify-center"
                  }`}
                >
                  {isLoginToggled ? (
                    <LoginForm onChange={onChange} loginInfo={loginInfo} />
                  ) : (
                    <SignupForm onChange={onChange} signupInfo={signupInfo} />
                  )}
                </div>
              </div>

              <div className="divider divider-horizontal text-black">OR</div>

              <div className="w-2/5 h-full flex flex-col">
                <p className="text-[#1A2238] font-semibold absolute md:text-base text-sm">
                  if you forgot your password...
                </p>
                <div className="flex flex-col h-full justify-center">

                  <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="email"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        
                      />
                      <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email
                      </label>
                  </div>
                </div>
                <div 
                  className="flex flex-col h-auto justify-center"
                  onClick={alertReset}
                >
                  <div className="w-full h-10 bg-[#1A2238] my-2 rounded-lg text-white flex items-center justify-between md:px-4 px-1 text-sm drop-shadow-lg cursor-pointer">
                    <p>Forget password</p>
                    <AiTwotoneMail size={24} />
                  </div>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Let's Go"
              className="rounded-md border border-[#1A2238] px-5 py-2 hover:bg-[#1A2238] hover:text-white trainsition-all duration-300 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
