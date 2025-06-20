import {useNavigate} from "react-router-dom";
import {useState} from "react";
import React from "react";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const validPassword = (password) => {
        return(
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password)
        );
    }

    const handleRegister = async (e: React.ChangeEvent<any>) => {
        setError("");
        e.preventDefault();
        setError("");
    }

    if (!name || !email || !password || !confirmPassword){
        setError("Check information");
        return;
    }

    return(
        <div>Register</div>
    )
}

export default Register;