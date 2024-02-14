import Image from "next/image";
import React, { useState } from "react"
import styled from "styled-components"


export default function Valentines() {

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 10 + 30;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };
  


  return (
    <CenteredContainer>      
      <ValentineContainer>
        {yesPressed ? (
          <>
            <Image src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="p" 
            width={400}
            height={340}/>
            <TextContainer>Ok yay!!!</TextContainer>
          </>
        ) : (
          <>
            <Image
              alt="o"
              className="h-[200px]"
              width={400} 
              height={340}
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            />
            <TextContainerAsH1>Will you be my Valentine?</TextContainerAsH1>
            <div>
              <ButtonYes
                style={{ fontSize: yesButtonSize }}
                onClick={() => setYesPressed(true)}
              >
                Yes
              </ButtonYes>

              <ButtonNo onClick={handleNoClick}>
                {noCount === 0 ? "No" : getNoButtonText()}
              </ButtonNo>
            </div>
          </>
        )}
      </ValentineContainer>
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div` 
display: flex;
font-size: large;
font-family: "Times New Roman", Times, serif;
flex-direction: column;
align-items: right;
justify-content: right;
height: 100vh;
margin: 0;
`;

const ValentineContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
`

const TextContainer = styled.div`
font-size: 2.25rem; 
margin-top: 1rem;
margin-bottom: 1rem;
`
const TextContainerAsH1 = styled.h1`
font-size: 2.25rem; 
margin-top: 1rem;
margin-bottom: 1rem;
`

const ButtonYes = styled.button`
background-color: #4f7457;
border-radius: 8px;
`

const ButtonNo = styled.button`
background-color: #c90d0d; 
color: #fff; 
font-weight: bold;
padding: 8px 16px; 
border-radius: 8px;
margin-left: 2rem;
`