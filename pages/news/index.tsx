import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import NewsCard from "components/NewsCard";
import Page from "components/Page";
import { NewsArticle } from "types";
import { media } from 'utils/media';

export default function News() {

    const [ getBerita, SetGetBerita ] = useState<NewsArticle[]>([]);

    useEffect(() =>{
    axios.get("https://newsapi.org/v2/top-headlines?country=id&apiKey=78c8fd330d7b4842a78f19ee291690b8").then((resp) => {
        const berita = resp.data.articles;
        console.log(berita);
        SetGetBerita(berita);
    }).catch((error) => {
        console.log(error);
    })
    }, [])


  return (
<Page
      title="Bertia Terkini"
      description="Cek Update Berita Terkini dari beberapa Platfrom"
    >
      <CustomAutofitGrid>
        {getBerita.map((news, i) => (
          <NewsCard
            key={i}
            title={news.title}
            tanggal={news.publishedAt}
            url={news.url}
          />
        ))}
      </CustomAutofitGrid>
    </Page>
  );
}

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }

  .article-card-wrapper {
    max-width: 100%;
  }
`;

