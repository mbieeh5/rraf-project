import { InferGetStaticPropsType } from "next";
import { useState } from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import ButtonCategory from "components/ButtonCategory";
import NewsCard from "components/NewsCard";
import Page from "components/Page";
import { KategoryItems, NewsArticle } from "types";
import { media } from 'utils/media';
import { getSingleNews } from "utils/newsFetcher";


const Kategory: KategoryItems = [
  {title: 'terbaru', category: "terbaru"},
  {title: 'nasional', category: "nasional"},
  {title: 'metro', category: "metro"},
  {title: 'ekbis', category: "ekbis"},
  {title: 'international', category: "international"},
  {title: 'daerah', category: "daerah"},
  {title: 'sports',category: "sports"},
  {title: 'otomotif', category: "otomotif"},
  {title: 'tekno', category: "tekno"},
  {title: 'sains', category: "sains"},
  {title: 'edukasi', category: "edukasi"},
  {title: 'lifestyle', category: "lifestyle"},
  {title: 'kalam', category: "kalam"},
]
export default function News({ news }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [newsA, setNews] = useState<NewsArticle[]>(news);
  const [displayedNews, setDisplayedNews] = useState<NewsArticle[]>(news.slice(0, 5));
  const [showMore, setShowMore] = useState(true);

  const pilihBeritaByKategory = async (category: string) => {
    const selectedNews = await getSingleNews(category);
    setNews(selectedNews);
    setDisplayedNews(selectedNews.slice(0, 5));
    setShowMore(true);

  }

  const loadMoreNews = () => {
    const currentCount = displayedNews.length;
    const nextCount = currentCount + 5;
    const moreNews = newsA.slice(currentCount, nextCount);
    setDisplayedNews([...displayedNews, ...moreNews]);
    if (nextCount >= newsA.length) {
      setShowMore(false);
    }
  }
  
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
    title="Berita Terkini"
    description="Cek Update Berita Terkini dari beberapa Platfrom"
    >
      <Wrapper>
        <ButtonCategory categories={Kategory} onCategorySelect={pilihBeritaByKategory} />
      </Wrapper>
      <CustomAutofitGrid>
        {displayedNews.map((news, i) => (
          <NewsCard
            key={Math.random() * i}
            title={news.title}
            thumbnail={news.thumbnail}
            pubDate={formatDate(news.pubDate)}
            link={news.link}
            description={news.description}
            />
        ))}
      </CustomAutofitGrid>
      <Wrapper2>
      {showMore && <ShowMoreButton onClick={loadMoreNews}>Lihat Lainnya</ShowMoreButton>}
      </Wrapper2>
    </Page>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 3rem;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  overflow-x: auto;
  margin-bottom: 3rem;
`;

const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  min-width: 3rem;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  margin-bottom: 3rem;
  justify-content: center;
`;

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

const ShowMoreButton = styled.button`
  font-size: 3rem;
  margin: 2rem;
  padding: 1rem 1.5rem;
  background-color: #0074D9;
  color: white;
  border: none;
  cursor: pointer;
`;

export async function getStaticProps() {
  return {
    props: {
      news: await getSingleNews(),
    },
  };
}