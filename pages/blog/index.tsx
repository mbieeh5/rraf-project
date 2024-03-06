import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import NewsCard from 'components/NewsCard';
import Page from 'components/Page';
import { useLogin } from 'contexts/LoginContext';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';

export default function BlogIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {

  const [isLogin, setIsLogin] = useState(false);
  const isLogins = useLogin().isLogin;
  const router = useRouter();
  
  useEffect(() => {
      if(isLogins){
          setIsLogin(true)
      }else{
          router.push('/');
      }
},[isLogins, router]);


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
        <Title>
            YOU MUST LOGIN FIRST
        </Title>
        }
    </>
  );
}

const Title = styled.h1`
text-align: center;
font-size: 5rem;
margin: 15rem;
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}

