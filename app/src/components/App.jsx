/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { NotFound } from "./NotFound";
import { ForgetPassword } from "./ForgetPassword";
import { ResetPassword } from "./ResetPassword";
// import SingleEntry from "./SingleEntry";
import {Route,Routes, useParams} from 'react-router-dom';
import ProtectedLayout from "./ProtectedLayout";

// import  { Toaster } from 'react-hot-toast';
function App(){
    const {isUser_id,accessToken}=useParams();
    return(
        <div className="flex flex-col h-screen">
            
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                <Route path="/resetpassword/:isUser_id/:accessToken" element={<ResetPassword />}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<ProtectedLayout/>}>
                    <Route path="home" element={<Home/>} />
                </Route>
            </Routes>
        </div>
    );
}
export default App;


