import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import RegisterImage from '../Images/infiniti-side.webp'
// import LoginImage from "../Images/side-img.webp";
import BeatLoader from "react-spinners/BeatLoader";
import { PhoneInput } from "react-contact-number-input"; //
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../index.css'; // Import your CSS file




const Register = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmopen, setConfirmopen] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: " ",
    password: ""
  })

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
  const toggle = () => {
    setOpen(!open)
  }
  const confirmtoggle = () => {
    setConfirmopen(!confirmopen)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handlePhoneChange = (phoneNumber) => {
    setData({ ...data, phone: phoneNumber });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target || { name: "phone", value: e }; // Use e as the value directly
  //   setData({ ...data, [name]: value });
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.password || !confirmpassword) {
      toast.error("Fill all details Properly");
      return;
    }

    setLoading(true);

    if (data.password !== confirmpassword) {
      toast.error("Both passwords should be the same");
      setLoading(false);
    } else {
      console.log(data);

      // Extract the phoneNumber from the phone object
      const phoneNumber = data.phone.phoneNumber;

      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/register",
          { ...data, phone: phoneNumber }, // Replace phone object with phoneNumber
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        );

        console.log(response);
        toast.success(response.data.message);

        if (response.status === 200) {
          toast.success("Redirecting to login");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div>
      {loading ? load() : (
        <div>
          <Nav />
          <div className="flex bg-slate-100" >
            {/* <div className="lg:w-1/2">
        <img src={LoginImage} className="h-screen" alt="Side Banner" />
      </div> */}
            <div className="lg:w-1/2 items-center p-24 ">
              <div className="bg-slate-300 p-20 rounded-lg">
                <div className=" ">
                  <img src={RegisterImage} className="" alt="" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 ml-8">
              <div>
                <div className=" w-8/12  px-9 py-6 shadow-lg shadow-gray-700 bg-slate-300">
                  <div className=" flex flex-col items-center text-right">
                    <h1 className="font-bold text-3xl text-gray-800">SignUp</h1>
                    <p className="text-lg text-secondary text-gray-500 font-semibold mt-4">Please SignUp to your account and start</p>
                  </div>
                  <form>
                    <div className="flex-col mt-7 space-y-3 ml-6">
                      <div class="flex space-x-2">

                        <div className=" flex-1 ">
                          <label className=" text-gray-500 font-semibold">First Name</label>
                          <input type="text" className="border p-2 rounded w-40" name="firstname" value={data.firstname} id="firstname" onChange={handleChange} />
                        </div>


                        <div className="text-left flex-1">
                          <label className=" text-gray-500 font-semibold">Last Name</label>
                          <input type="text" className="border p-2 rounded w-44" name="lastname" id="lastname" value={data.lastname} onChange={handleChange} />
                        </div>

                      </div>

                      <div className="text-left flex-1">
                        <label className=" text-gray-500 font-semibold" >Email</label>
                        <div className="lg:flex">
                          <input type="email" className="lg:w-96 border p-2 rounded" name="email" id="email" value={data.email} onChange={handleChange} />
                        </div>
                        {/* <span className="text-danger"></span> */}
                      </div>

                      <div className="phone-input-container">
                        <label className="text-left font-semibold text-gray-500">Phone</label>
                        <PhoneInput
                          value={data.phone}
                          id="phone"
                          name="phone"
                          countryCode="us"
                          onChange={handlePhoneChange}
                        />
                      </div>

                      <div className="lg:flex lg:flex-col lg:mb-2 relative">
                        <label className="text-left text-gray-500 font-semibold">Password</label>
                        <div className="lg:flex">
                          <input type={open ? "text" : "password"} className="lg:w-96 border p-2 rounded" name="password" id="password" value={data.password} onChange={handleChange} />
                          <div className="text-2xl absolute bottom-2 right-16">
                            {open ? (<FaEyeSlash onClick={toggle} className="text-gray-400" />) : (<FaEye onClick={toggle} className="text-gray-400" />)}
                          </div>
                        </div>

                      </div>

                      <div className="lg:flex lg:flex-col lg:mb-2 relative">
                        <label className="text-left text-gray-500 font-semibold" >Confirm Password</label>
                        <div className="lg:flex">
                          <input type={confirmopen ? "text" : "password"} className="lg:w-96 border p-2 rounded" name="confirmpassword" id="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                          <div className="text-2xl absolute bottom-2 right-16">
                            {confirmopen ? (<FaEyeSlash onClick={confirmtoggle} className="text-gray-400" />) : (<FaEye onClick={confirmtoggle} className="text-gray-400" />)}
                          </div>
                        </div>

                      </div>

                      <div className="lg:flex lg:flex-col">
                        <div className="lg:mb-2 mt-4">
                          <button type="submit" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-96" onClick={handleSubmit}>SignUp</button>
                        </div>
                        <div className=" items-center">
                          <div className="lg:mb-0 flex">
                            <span className="mr-2 text-gray-500 font-semibold" >Do you have an Account?</span>
                            <a className="font-semibold text-rose-700" href="/"><span href="/" >Login Now</span> </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          </div>
        </div>)}
    </div>

  );

}
export default Register;




// import React, { useState } from "react";
// import BeatLoader from "react-spinners/BeatLoader";
// import RegisterImage from '../Images/infiniti-side.webp'
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Nav from "./Nav";
// import { PhoneInput } from "react-contact-number-input";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [confirmopen, setConfirmOpen] = useState(false);
//   const [confirmpassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phone: "",
//     password: ""
//   });

//   const toggle = () => {
//     setOpen(!open);
//   };

//   const confirmtoggle = () => {
//     setConfirmOpen(!confirmopen);
//   };

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handlePhoneChange = (phoneNumber) => {
//     setData({ ...data, phone: phoneNumber });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.password || !confirmpassword) {
//       toast.error("Fill all details Properly");
//       return;
//     }

//     setLoading(true);

//     if (data.password !== confirmpassword) {
//       toast.error("Both passwords should be the same");
//       setLoading(false);
//     } else {
//       const phoneNumber = data.phone.phoneNumber;

//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/user/register",
//           { ...data, phone: phoneNumber },
//           {
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         );

//         toast.success(response.data.message);

//         if (response.status === 200) {
//           toast.success("Redirecting to login");
//           setTimeout(() => {
//             navigate("/");
//           }, 2000);
//         }
//       } catch (err) {
//         console.log(err);
//         toast.error(err.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="bg-white p-5 rounded-lg">
//             <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
//             <p className="mt-4 text-gray-600">Loading...</p>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <Nav />
//           <div className="lg:flex bg-slate-100">
//             <div className="hidden lg:block lg:w-1/2 p-16">
//               <div className="bg-slate-300 rounded-lg lg:p-20 h-full flex justify-center items-center">
//                 <img src={RegisterImage} alt="" className="max-w-full rounded-lg" />
//               </div>
//             </div>
//             <div className="w-full lg:w-1/2 mt-10 px-4 lg:px-16">
//               <div className="w-full max-w-md mx-auto bg-slate-300 p-6 rounded-lg">
//                 <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">SignUp</h1>
//                 <form>
//                   {/* ... your form fields ... */}
//                   <div className="flex-col mt-7 space-y-3 ml-6">
//                       <div class="flex space-x-2">

//                         <div className=" flex-1 ">
//                           <label className=" text-gray-500 font-semibold">First Name</label>
//                           <input type="text" className="border p-2 rounded w-40" name="firstname" value={data.firstname} id="firstname" onChange={handleChange} />
//                         </div>


//                         <div className="text-left flex-1">
//                           <label className=" text-gray-500 font-semibold">Last Name</label>
//                           <input type="text" className="border p-2 rounded w-44" name="lastname" id="lastname" value={data.lastname} onChange={handleChange} />
//                         </div>

//                       </div>

//                       <div className="text-left flex-1">
//                         <label className=" text-gray-500 font-semibold" >Email</label>
//                         <div className="lg:flex">
//                           <input type="email" className="lg:w-96 border p-2 rounded" name="email" id="email" value={data.email} onChange={handleChange} />
//                         </div>
//                         {/* <span className="text-danger"></span> */}
//                       </div>

//                       <div className="phone-input-container">
//                         <label className="text-left font-semibold text-gray-500">Phone</label>
//                         <PhoneInput
//                           value={data.phone}
//                           id="phone"
//                           name="phone"
//                           countryCode="us"
//                           onChange={handlePhoneChange}
//                         />
//                       </div>

//                       <div className="lg:flex lg:flex-col lg:mb-2 relative">
//                         <label className="text-left text-gray-500 font-semibold">Password</label>
//                         <div className="lg:flex">
//                           <input type={open ? "text" : "password"} className="lg:w-96 border p-2 rounded" name="password" id="password" value={data.password} onChange={handleChange} />
//                           <div className="text-2xl absolute bottom-2 right-16">
//                             {open ? (<FaEyeSlash onClick={toggle} className="text-gray-400" />) : (<FaEye onClick={toggle} className="text-gray-400" />)}
//                           </div>
//                         </div>

//                       </div>

//                       <div className="lg:flex lg:flex-col lg:mb-2 relative">
//                         <label className="text-left text-gray-500 font-semibold" >Confirm Password</label>
//                         <div className="lg:flex">
//                           <input type={confirmopen ? "text" : "password"} className="lg:w-96 border p-2 rounded" name="confirmpassword" id="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} />
//                           <div className="text-2xl absolute bottom-2 right-16">
//                             {confirmopen ? (<FaEyeSlash onClick={confirmtoggle} className="text-gray-400" />) : (<FaEye onClick={confirmtoggle} className="text-gray-400" />)}
//                           </div>
//                         </div>

//                       </div>

//                       <div className="lg:flex lg:flex-col">
//                         <div className="lg:mb-2 mt-4">
//                           <button type="submit" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-96" onClick={handleSubmit}>SignUp</button>
//                         </div>
//                         <div className=" items-center">
//                           <div className="lg:mb-0 flex">
//                             <span className="mr-2 text-gray-500 font-semibold" >Do you have an Account?</span>
//                             <a className="font-semibold text-rose-700" href="/"><span href="/" >Login Now</span> </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                 </form>
//                 <div className="flex flex-col items-center mt-6">
//                   <button
//                     type="submit"
//                     className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full"
//                     onClick={handleSubmit}
//                   >
//                     SignUp
//                   </button>
//                   <div className="mt-4 flex">
//                     <span className="text-gray-500 font-semibold">Do you have an Account?</span>
//                     <a className="ml-2 font-semibold text-rose-700" href="/">
//                       Login Now
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;
