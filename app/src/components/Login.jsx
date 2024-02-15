
// import React from "react";
// import BeatLoader from "react-spinners/BeatLoader";
// import { useState } from "react";
// import LoginImage from "../Images/infiniti-side.webp";
// import DarkLogo from "../Images/logo-blue-removebg-preview.webp";
// import axios from 'axios';
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from 'react-hot-toast';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Nav from "./Nav";
// const Login = () => {


//   const navigate = useNavigate();
//   let [loading, setLoading] = useState(false);
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [open,setOpen] = useState(false);
//   // spinner
//   const load = () => {
//     return (
//       <div className={`flex justify-center items-center h-screen ${loading ? 'block' : 'hidden'}`}>
//         <div className="bg-white p-5 rounded-lg">
//           <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   //handling toggle
//   const toggle = () =>{
//     setOpen(!open)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(!email ||!password){
//       toast.error("Fill all details");
//       return;
//     }
//     setLoading(true)
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);

//     try {
//       const response = await axios.post("http://localhost:8000/api/user/login", formData, {
//         headers: {
//           'Content-type': 'application/json'
//         }
//       })
//       // console.log(response);
//       if (response.status === 400) toast.error("Fill all details");
//       else if (response.status === 200) {
//         const { message, firstname } = response.data;
//         toast.success(`${message}. Welcome, ${firstname}!`);
//         localStorage.setItem("firstname", response.data.firstname)
//         localStorage.setItem ("token", response.data.accessToken);
//         localStorage.setItem("taskid",response.data.uniqueObjid)
//         setTimeout(() => {
//           navigate("/home");
//         }, 1000)
//       }
//       else if (response.status === 401) toast.error("Invalid Credentials");
//       else if (response.status === 404){
//         toast.error("User Not Found");

//       } 
//       if (response.status === 500) toast.error("Internal Server Error");
//     }
//     catch (err) {
//       console.log(err);
//       toast.error(err.response.data.message);
//     }
//     finally{
//       setLoading(false);
//       // setpassword("");
//     }

//   };
//   return (
//      <div>{loading?load():(
//       <div>
//         <Nav/>
//     <div className="flex bg-slate-100" >
//       <div className="lg:w-1/2 items-center p-24 ">
//         <div className="bg-slate-300 p-20 rounded-lg">
//     <div className=" ">
//       <img src={LoginImage} className="" alt="" />
//     </div>
//     </div>
//     </div>
//     <div className="lg:w-1/2">
//       <form>
//         <div className="lg:flex lg:h-screen">
//           <div className="lg:m-auto w-7/12 shadow-lg shadow-gray-700 px-14 py-10 bg-slate-300 rounded-lg">
//             <div className=" flex flex-col items-center text-left">
//               <h1 className="font-bold text-3xl text-gray-800">Login</h1>
//               <p className="text-lg  text-gray-500 font-semibold mt-6">Please Sign-In to your account and start</p> <br />
//             </div>
//             <div className="lg:flex lg:flex-col login-form">
//               <div className="lg:flex lg:flex-col lg:mb-2">
//                 <label className="text-left text-gray-500 font-semibold">Email</label>
//                 <div className="lg:flex">
//                   <input type="email" value={email} className="lg:w-full border p-2 rounded" onChange={(event) => setemail(event.target.value)} />
//                 </div>
//                 <span className="text-danger"></span>
//               </div>
//               <div className="lg:flex lg:flex-col lg:mb-2 relative">
//                 <label className="text-left text-gray-500 font-semibold">Password</label>
//                 <div className="lg:flex">
//                   <input type={open ? "text" : "password"} value={password} className="lg:w-full border p-2 rounded" onChange={(event) => setpassword(event.target.value)} />
//                 </div>
//                 <div className="text-2xl absolute bottom-2 right-3 ">
//                         {
//                           open?(<FaEyeSlash onClick={toggle} className="text-gray-400"/>):(<FaEye onClick={toggle} className="text-gray-400"/>)
//                         }
//                 </div>
//                 <span className="text-danger"></span>
//               </div>
//               <p className="lg:mb-3 lg:flex lg:justify-end text-rose-700 font-semibold">
//                 <Link to={"/forgetpassword"}>Forgot Password?</Link>
//               </p>
//               <div className="lg:flex lg:flex-col">
//                 <div className="lg:mb-2">
//                   <button type="submit" className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full" onClick={handleSubmit}>
//                     <span>Login</span>
//                   </button>
//                 </div>
//                 <div className="text-center lg:mb-0">
//                   <span className="mr-2 text-gray-500 font-semibold" >Don't have an Account?</span>
//                   <Link className="font-semibold text-rose-700" to={"/register"}>SignUp</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
//   </div>
//   )}
//       </div>
//   );


// }
// export default Login;


import React, { useState } from "react";
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Nav from "./Nav";
import LoginImage from "../Images/infiniti-side.webp";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);


  const load = () => {
    return (
      <div
        className={`flex justify-center items-center h-screen ${loading ? "block" : "hidden"
          }`}
      >
        <div className="bg-white p-5 rounded-lg">
          <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fill all details");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 400) toast.error("Fill all details");
      else if (response.status === 200) {
        const { message, firstname } = response.data;
        toast.success(`${message}. Welcome, ${firstname}!`);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("taskid", response.data.uniqueObjid);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (response.status === 401) toast.error("Invalid Credentials");
      else if (response.status === 404) {
        toast.error("User Not Found");
      }
      if (response.status === 500) toast.error("Internal Server Error");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        load()
      ) : (
        <div>
          <Nav />
          <div className="lg:flex bg-slate-100">
     
            <div className="hidden lg:block lg:w-1/2 p-16">
              <div className="bg-slate-300 rounded-lg lg:p-20 h-full flex justify-center items-center">
                <img src={LoginImage} alt="" className="max-w-full rounded-lg" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-10">
              <form className="p-6 lg:p-10 h-96 md:h-56">
                <div className="lg:m-auto w-full lg:w-7/12  p-10 shadow-lg shadow-gray-700 bg-slate-300 rounded-lg">
                
                  <div className="text-left">
                    <h1 className="font-bold text-3xl text-gray-800">Login</h1>
                    <p className="text-lg text-gray-500 font-semibold mt-6">
                      Please Sign-In to your account and start
                    </p>
                  </div>
                  <div className="login-form mt-6">
                    <div className="mb-4">
                      <label className="text-left text-gray-500 font-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        className="w-full border p-2 rounded"
                        onChange={(event) => setEmail(event.target.value)}
                      />

                      {/* <input type="email" value={email} className="lg:w-full border p-2 rounded" onChange={(event) => setemail(event.target.value)} /> */}
                    </div>
                    <div className="mb-4 relative">
                      <label className="text-left text-gray-500 font-semibold">
                        Password
                      </label>
                       <input
                        type={open ? "text" : "password"}
                        value={password}
                        className="w-full border p-2 rounded"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <div className="text-2xl absolute bottom-2 right-3">
                        {open ? (
                          <FaEyeSlash
                            onClick={toggle}
                            className="text-gray-400"
                          />
                        ) : (
                          <FaEye onClick={toggle} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className="mb-3 flex justify-end text-rose-700 font-semibold">
                      <Link to={"/forgetpassword"}>Forgot Password?</Link>
                    </p>
                    <div className="mb-2">
                      <button
                        type="submit"
                        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 font-semibold">
                        Don't have an Account?
                      </span>{" "}
                      <Link
                        className="font-semibold text-rose-700"
                        to={"/register"}
                      >
                        SignUp
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
