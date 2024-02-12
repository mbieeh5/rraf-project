import React, { useEffect } from "react"
import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid";
import Page from "components/Page"
import AbsenCard from "pages/tools/bot-things/component/AbsenCard";


export default function EtmcBot() {

  useEffect(() => {

  }, []);

  return (
    <Page title="ETMC BOT TOOLS!">
      <Wrapper>
      <AutofitGrid>
            <AbsenCard />
        </AutofitGrid>
      </Wrapper>
  </Page>
  );
}

const Wrapper = styled.div`
  margin: 0.5rem;
  align-items: center;
`;