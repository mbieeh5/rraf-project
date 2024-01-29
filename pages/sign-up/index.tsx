import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider,  signInWithPopup, TwitterAuthProvider,  } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/Button";
import Container from "components/Container";
import Facebook from "components/Facebook";
import Github from "components/Github";
import Google from "components/Google";
import Page from "components/Page";
import Twitter from "components/Twitter";
import { useLogin } from "contexts/LoginContext";
import { auth } from "../../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("")
  const [EmailError, setEmailError] = useState("")
  const [errorIndex, setErrorIndex] = useState(0);
  const providerFacebook = new FacebookAuthProvider();
  const providerTwitter = new TwitterAuthProvider();
  const providerGoogle = new GoogleAuthProvider();
  const providerGithub = new GithubAuthProvider();
  
  
  const { setLogin } = useLogin();
  
  const handleSignUp = () => {
      const errorMessage = [
          'Selamat Kena Prank, orng lagi maintenance wkwk',
          'Udah Gausah Di Pencet lagi!',
          'Cukuppp',
          'UDAHH ANJAYY',
          'AWOKOAWKAWOK masih aja ngeyel anjay',
          'Yaudah Terserah dahh',
          'Password: rraf-Project55',
        ]
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegexUper = /(?=.*[A-Z])/;
        const passwordRegexAngka = /\d/;
        const passwordRegexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    
    if(!email && !password){
        setEmailError('Silahkan isi Email Dan sandi Terlebih dahulu');
        return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Email tidak valid');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Kata sandi harus minimal 8 karakter');
      return;
    }

    if (!passwordRegexUper.test(password)) {
        setPasswordError('Kata sandi harus memiliki setidaknya satu huruf besar.');
        return;
    }

    if (!passwordRegexAngka.test(password)) {
      setPasswordError('Kata sandi harus memiliki setidaknya satu angka.');
      return;
    }

    if (!passwordRegexSpecial.test(password)) {
      setPasswordError('Kata sandi harus memiliki setidaknya satu special karakter.');
      return;
    }

    if (email && password){
        setErrorIndex(prevIndex => (prevIndex + 1) % errorMessage.length)
        setPasswordError(errorMessage[errorIndex])
        return;
    }

/*
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user  = res.user;
          setLogin(user.emailVerified);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
*/
}

  const signInWithGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((res) => {
        const user  = res.user;
        setLogin(user.emailVerified);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const signInWithFacebook = () => {
    signInWithPopup(auth, providerFacebook)
    .then((res) => {
      const user  = res.user;
      setLogin(user.emailVerified);
    })
    .catch((error) => {
      console.log(error);
    });
}
const signInWithTwitter = () => {
    signInWithPopup(auth, providerTwitter)
    .then((res) => {
        const user  = res.user;
        setLogin(user.emailVerified);
    })
    .catch((error) => {
      console.log(error);
    });
}
const signInWithGithub = () => {
    signInWithPopup(auth, providerGithub)
    .then((res) => {
        const user  = res.user;
        setLogin(user.emailVerified);
    })
    .catch((error) => {
      console.log(error);
      });
  }
  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
    setEmailError("");
  }
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
    setPasswordError("");
  }
  return (
    <Page title="Sign-Up Here">
      <Container>
        <Card>
                <Container>{EmailError||PasswordError}</Container>
          <Label>Email/Username:</Label>
          <Input placeholder="Email/Username"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          
          <Label>Password:</Label>
          <Input placeholder="Enter Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          
          <Button onClick={handleSignUp}>Sign Up</Button>

          <ButtonOauth onClick={signInWithGoogle}>
            <Google /> <TextWrapper>Sign In With Google</TextWrapper>
          </ButtonOauth>
          <ButtonOauth onClick={signInWithFacebook}>
            <Facebook /> <TextWrapper>Sign In With Facebook</TextWrapper>
          </ButtonOauth>
          <ButtonOauth onClick={signInWithTwitter}>
            <Twitter /> <TextWrapper>Sign In With X</TextWrapper>
          </ButtonOauth>
          <ButtonOauth onClick={signInWithGithub}>
            <Github /> <TextWrapper>Sign In With Github</TextWrapper>
          </ButtonOauth>
        </Card>
      </Container>
    </Page>
  );
}

const Card = styled.div`
  padding: 2.5rem;
  background: rgb(var(--cardBackground));
  box-shadow: var(--shadow-lg);
  text-align: center;
  width: 100%;
  border-radius: 0.6rem;
  color: rgb(var(--text));
  font-size: 1.6rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }
`;

const TextWrapper = styled.div`
font-size: 1.5rem;
margin: 1rem;

`

const ButtonOauth = styled.button`
  border-radius: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  width: 26%;
  align-items: center;
  color: #333;
  font-size: 1.4rem;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Label = styled.label`
  text-decoration: underline;
  font-weight: bold;
  padding: 0.5rem;
  display: block;
`;

const Input = styled.input`
  border: none;
  border-radius: 5rem;
  margin: 0.5rem auto;
  padding: 1rem;
  width: calc(100% - 2rem);
  box-shadow: var(--shadow-lg);

  &::placeholder {
    text-align: center; /* Mengatur teks placeholder agar berada di tengah */
  }
`;