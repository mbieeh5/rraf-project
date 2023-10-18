import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { useLogin } from "contexts/LoginContext";
import { auth } from "../../firebase";

export default function SignUp() {
    const provider = new GoogleAuthProvider();
    const { setLogin } = useLogin();

    const SigninWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            const user  = res.user;
            setLogin(user.emailVerified);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    return(
    <Wrapper>
        <Title>login Here</Title>
        <button onClick={SigninWithGoogle}>Login</button>
    </Wrapper>
    );
}

const Wrapper = styled.div`
display: flex;
align-items:center;
padding: 1rem;
width: 100%;
`;

const Title = styled.h1`
    font-size: 3rem;
`; 