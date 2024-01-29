import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import BasicCardNoImg from "components/BasicCardNoImg"
import Page from "components/Page"


export default function Shopping() {
    return(
        <Page
        title="Shop"
        description="Happy Shopping for the best offer"
        >
            <Wrapper>
                <AutofitGrid>
                    <BasicCardNoImg title="Pokemon Shop" link="/shopping/pokemon/" description="Beli Pokemon dan kebutuhan Pokemonmu di Sini"/>
                    <BasicCardNoImg title="Undangan Online" link="/shopping/undangan-pernikahan/" description="Kalian Bisa Sewa Undangan Online di sini. Jom di Klik"/>
                </AutofitGrid>
            </Wrapper>
        </Page>
    )
}


const Wrapper = styled.div`

`