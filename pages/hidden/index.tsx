import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/Button";



export default function EasterEgg() {

const [isGetIn, setIsGetIn] = useState("");
const [password, setPassword] = useState("");

const passwordCheck = () => {
if(password === 'rraf-Project55'){
    setIsGetIn('Wakwaw');
    return;
}else{
    setIsGetIn("Passwordnya Salah, hint nya. login")
}
}


const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  }
    return(
        <Wrapper>
            <Wrapper>
            <label>Enter Password To Access The Content</label>
            </Wrapper>
            <Wrapper>
            <label>{isGetIn}</label>
            </Wrapper>
            <Wrapper>
                <input type="password" placeholder="Input The Password" onChange={handlePasswordChange}/>
            </Wrapper>
            <Wrapper>
            <Button onClick={passwordCheck}>Get In</Button>
            </Wrapper>
        </Wrapper>
    )
}


const Wrapper = styled.div`
margin: 1rem;
display: block;
align-items: center;
font-size: 1rem;

`