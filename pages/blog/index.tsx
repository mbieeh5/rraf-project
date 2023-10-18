import { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import NewsCard from 'components/NewsCard';
import Page from 'components/Page';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';

export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {

  const [isLogin, setIsLogin] = useState(false);

  function Login():void {
    setTimeout(() =>{
      return setIsLogin(true);
    }, 5000);
  }
Login();

  return (
    <>
    {isLogin ? 
      <Page
      title="Blog & Forum Section"
      description=""
      >
      <CustomAutofitGrid>
        {posts.map((blog, i) => (
          <NewsCard
          key={i}
          title={blog.title}
          thumbnail={blog.thumbnail}
          link={blog.link}
          pubDate={blog.pubDate}
          description={blog.description}
          />
          ))}
      </CustomAutofitGrid>
    </Page>
        : 
        " You Not Login Yet To see this blog"}
    </>
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
