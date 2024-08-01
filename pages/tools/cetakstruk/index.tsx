import axios from "axios";
import React, { useEffect } from "react"
import styled from "styled-components"
import Page from "components/Page"


export default function Sum() {


    const bankName = () => {
        axios.get('https://api-rekening.lfourr.com/listBank')
        .then((a) => {
            console.log(a);
        })
    }
    
    useEffect(() => {

      }, []);


  return (
  <Page title="Cetak Struk Transfer Bank">
    <Wrapper>
        <Forms>
            <FormsWrapper>
                
            <Labels>
                Pilih Bank
                <Dropdown placeholder="Pilih Bank Tujuan" onClick={() => {bankName()}}>

                </Dropdown>
            </Labels>
            <Labels>
                Nomor Rekening
                <Inputs></Inputs>
            </Labels>
            <Labels>
               Nama Pengirim
                <Inputs></Inputs>
            </Labels>
            <Labels>
               Nama Penerima
                <Inputs></Inputs>
            </Labels>
            <Labels>
               Jumlah Transfer
                <Inputs></Inputs>
            </Labels>
            <br/>
            <br/>
            <Labels>
               Biaya Admin
                <Inputs></Inputs>
            </Labels>
            <Labels>
               Total Bayar
                <Inputs></Inputs>
            </Labels>
            </FormsWrapper>
        </Forms>
    </Wrapper>
  </Page>
  );
}

const Wrapper = styled.div`
  margin: 0.5rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Forms = styled.form`
`;

const FormsWrapper = styled.div`
display: flex;
flex-direction: column;
`

const Labels = styled.label`
 font-size: 2rem;
 margin-bottom: 1rem;
 display: flex;
 flex-direction: column;
 `;

const Inputs = styled.input` 
border-radius: 12px;
width: 100%;
height: 4rem;
`

const Dropdown = styled.select`
  /* Gaya untuk dropdown */
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
`;