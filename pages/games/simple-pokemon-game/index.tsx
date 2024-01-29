import styled from "styled-components"
import GameCanvas from "./logicGame";


export default function PokemonGames() {


    return(
        <ParentWrapper>
            <GameWrapper>
                <GameCanvas />
            </GameWrapper>
        </ParentWrapper>
    )
};

const ParentWrapper = styled.div`
align-items: center;
`

const GameWrapper = styled.div`
display: flex;
margin-left: auto;
margin-right: auto;
padding: 1rem;
padding-bottom: 15rem;
`;