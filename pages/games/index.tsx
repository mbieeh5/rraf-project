import React from "react"
import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import BasicCardNoImg from "components/BasicCardNoImg"
import Page from "components/Page"


export default function Games() {
    return(
        <Page title="Games" description="Game Game simple aja, bisa di save kok kalo kalian login">
            <ToolsWrapper>
                <AutofitGrid>
                    <BasicCardNoImg 
                    link="/games/simple-pokemon-game" 
                    title="Simple Pokemon Game" 
                    description="Game nya sama kayak tamagochi sih, tapi nanti di tambahin fitur fitur baru lainnya" />
             </AutofitGrid>
            </ToolsWrapper>
        </Page>
    )
}

const ToolsWrapper = styled.div`
margin: 3rem;
align-item: center;

`