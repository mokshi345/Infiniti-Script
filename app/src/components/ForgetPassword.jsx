
// import React from "react";
// import BeatLoader from "react-spinners/BeatLoader";
// import { useState } from "react";
// import DarkLogo from "../Images/logo-blue-removebg-preview.webp";
// import ForgetImage from "../Images/forget.webp"
// import axios from 'axios';
// import { useNavigate,Link} from "react-router-dom";
// import { toast } from 'react-hot-toast';
// import {IoChevronBack} from "react-icons/io5"
// export const ForgetPassword = () => {


//   const navigate = useNavigate();
//   let [loading, setLoading] = useState(false);
//   const [email, setemail] = useState("");
// //   const [password, setpassword] = useState("");
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
 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(!email){
//       toast.error("Fill details");
//       return;
//     }
//     setLoading(true)
//     const formData = new FormData();
//     formData.append("email", email);
//     // formData.append("password", password);
    
//     try {
//       const response = await axios.post("http://localhost:8000/api/user/forgetpassword", formData, {
//         headers: {
//           'Content-type': 'application/json'
//         }
//       })
//       console.log(response);
//       toast.success(response.data.message)
//       if (response.status === 400) toast.error("Fill email properly");
//     else if(response.status === 200) {
//         toast.success("Email sent successfully");
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } 
//     //   else if (response.status === 401) toast.error("Invalid Credentials");
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
//       setemail("");
//     }

//   };
//   return (
//      <div>{loading? load():(
//     <div className="lg:flex bg-black h-screen bg-opacity-20 " >
//     <div className="flex justify items-center ml-96">
//       <form className="flex justify items-center w-auto ml-52">
//           <div className=" lg:m-auto shadow-lg shadow-gray-700 px-16 py-10 bg-slate-200 rounded-lg">
//             <div className=" flex flex-col items-center text-center">
//               <img src={ForgetImage} alt="Logo" className="mb-4 h-32 w-32" />
//               {/* <small className="text-red-800 font-bold lg:mb-2 lg:justify-end pl-10">NLP Powered Document Processer</small> */}
        
//               <h1 className="text-xl text-gray-600 font-semibold">Forgot Password</h1>
//             </div>
//             <div className="lg:flex lg:flex-col mt-4 ">
//               <div className="lg:flex lg:flex-col lg:mb-2">
//                 <label className="text-left text-gray-500 font-semibold">Email</label>
//                 <div className="lg:flex">
//                   <input type="email" className="lg:w-full border p-2 rounded" onChange={(event) => setemail(event.target.value)} />
//                 </div>
                
//               </div>
//               <div className="lg:flex lg:flex-col">
//                 <div className="lg:mb-2 mt-3">
//                   <button type="submit" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full" onClick={handleSubmit}>Send</button>
//                   <div className="flex items-center mt-3 ml-14 text-rose-700 hover:text-rose-600 text-lg">
//                     <IoChevronBack/>
//                     <Link to={'/'}>Back to Login</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </form>
//     </div>
//   </div>
//   )}
//       </div>
//   );


// }



import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import DarkLogo from "../Images/logo-blue-removebg-preview.webp";
import ForgetImage from "../Images/forget.webp";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");


    const load = () => {
    return (
      <div className={`flex justify-center items-center h-screen ${loading ? 'block' : 'hidden'}`}>
        <div className="bg-white p-5 rounded-lg">
          <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Fill details");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/forgetpassword",
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      if (response.status === 400) toast.error("Fill email properly");
      else if (response.status === 200) {
        toast.success("Email sent successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (response.status === 404) {
        toast.error("User Not Found");
      }
      if (response.status === 500) toast.error("Internal Server Error");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
      setemail("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (load()
      ) : (
        <div className="w-full max-w-md mx-auto px-4 ">
          <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-md p-8 bg-slate-200 rounded-lg shadow-lg">
              <div className="flex flex-col items-center text-center mb-6">
                <img src={ForgetImage} alt="Logo" className="mb-4 h-32 w-32" />
                <h1 className="text-xl text-gray-600 font-semibold">Forgot Password</h1>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  onChange={(event) => setemail(event.target.value)}
                />
              </div>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
                  onClick={handleSubmit}
                >
                  Send
                </button>
                <div className="flex items-center text-rose-700 hover:text-rose-600 text-lg">
                  <IoChevronBack className="mr-2" />
                  <Link to={"/"}>Back to Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};






