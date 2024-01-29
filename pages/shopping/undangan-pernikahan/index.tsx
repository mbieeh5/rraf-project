import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import BasicCardNoImg from "components/BasicCardNoImg"
import Page from "components/Page"


export default function undanganNikah() {
    return(
        <Page
        title="Undangan Pernikahan"
        description="Kalian Bisa klik dan pilih undangan yang sesuai kebutuhan"
        >
            <Wrapper>
                <AutofitGrid>
                    <BasicCardNoImg title="Undangan-1" link="/undangan-pernikahan/undangan-1" description=""/>
                    <BasicCardNoImg title="Undangan-2" link="/undangan-pernikahan/undangan-2" description=""/>
                    <BasicCardNoImg title="Undangan-3" link="/undangan-pernikahan/undangan-3" description=""/>
                    <BasicCardNoImg title="Undangan-4" link="/undangan-pernikahan/undangan-4" description=""/>
                    <BasicCardNoImg title="Undangan-5" link="/undangan-pernikahan/undangan-5" description=""/>
                    <BasicCardNoImg title="Undangan-6" link="/undangan-pernikahan/undangan-6" description=""/>
                    <BasicCardNoImg title="Undangan-7" link="/undangan-pernikahan/undangan-7" description=""/>
                    <BasicCardNoImg title="Undangan-8" link="/undangan-pernikahan/undangan-8" description=""/>
                    <BasicCardNoImg title="Undangan-9" link="/undangan-pernikahan/undangan-9" description=""/>
                </AutofitGrid>
            </Wrapper>
        </Page>
    )
}


const Wrapper = styled.div`

`