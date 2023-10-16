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
    axios.get("https://api-berita-indonesia.vercel.app/tribun/terbaru/").then((resp) => {
        const berita = resp.data.data.posts;
        console.log(berita);
        SetGetBerita(berita)
    }).catch((error) => {
        console.log(error);
    })
    }, [])

    const formatDate = (pubDate: string) => {
      const date = new Date(pubDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes} ${day}-${month}-${year}.`;
  
    }

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
            thumbnail={news.thumbnail}
            pubDate={formatDate(news.pubDate)}
            link={news.link}
            description={news.description}
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

