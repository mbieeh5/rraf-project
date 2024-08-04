import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function KartuUcapan() {
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === "YW8PV8KH") {
      setIsLogin(true);
    } else {
      alert("Password ada di belakang Barcode! --Error:C0001219");
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    const createLove = () => {
      const love = document.createElement('div');
      love.className = 'love';
      love.style.left = `${Math.random() * 100}vw`;
      love.style.animationDuration = `${Math.random() * 5 + 3}s`;
      document.querySelector('.love-container')?.appendChild(love);
      setTimeout(() => {
        love.remove();
      }, 10000);
    };

    const interval = setInterval(createLove, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <CenteredContainer>
      {!isLogin ? (
        <>
          <Label>
            <input
              type="password"
              placeholder="Masukkan Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          <Button onClick={handleLogin}>Masuk</Button>
        </>
      ) : (
        <Wrapper>
          <MessageCard>
            <h1>SELAMAT MENEMPUH HIDUP BARU RIDWAN & NINIS</h1>
            <p>
              “Saya berharap Ada semua cinta, semua perhatian, semua kebahagiaan, dan ikatan yang akan
              bertahan seumur hidup. selamat atas pernikahanmu. Semoga hidupmu dipenuhi dengan cinta, 
              sukacita, kedamaian, rezeki yang melimpah, dan kebahagiaan. Selamat menempuh hidup baru!”
            </p>
            <Button onClick={launchConfetti}>🥳</Button>
          </MessageCard>
          <LoveContainer className="love-container" />
        </Wrapper>
      )}
    </CenteredContainer>
  );
}

const float = keyframes`
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(calc(-50vw + 50px));
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const LoveContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  .love {
    position: absolute;
    bottom: -10vh;
    width: 30px;
    height: 30px;
    background: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red"/></svg>') no-repeat center center;
    background-size: contain;
    opacity: 0.6;
    animation: ${float} 10s infinite ease-in;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  font-size: large;
  font-family: "Times New Roman", Times, serif;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: rgb(var(--background, 255, 255, 255)); /* Default background color if variable is not set */
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  input {
    padding: 10px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MessageCard = styled.div`
  text-align: center;
  padding: 20px;
  padding-top: 12rem;
  border-radius: 10px;
  background-color: #fff;
  color: rgb(var(--secondary, 0, 0, 0)); /* Default secondary color if variable is not set */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;

  h1 {
    margin-bottom: 10px;
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }
`;
