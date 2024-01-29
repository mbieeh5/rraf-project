import React from "react"
import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import BasicCardNoImg from "components/BasicCardNoImg"
import Page from "components/Page"


export default function Tools() {
    return(
        <Page title="Tools & Utilities" description="Cari Alat atau Aplikasi yang dapat kamu gunakan disini">
            <ToolsWrapper>
                <AutofitGrid>
                    <BasicCardNoImg link="/tools/sum" title="Penambahan & Penjumlahan" description="Kamu dapat menambahkan items dan dapat menjumlahakan totalnya di sini, cocok buat kalian yang mau belanja nih" />
                    <BasicCardNoImg link="/tools/pokemon-wiki" title="POKEMON WIKI" description="Wikipedianya Pokemon" />
              </AutofitGrid>
            </ToolsWrapper>
        </Page>
    )
}

const ToolsWrapper = styled.div`
margin: 3rem;
align-item: center;

`