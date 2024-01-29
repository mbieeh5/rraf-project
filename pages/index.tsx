import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import BasicSection from 'components/BasicSection';
import { EnvVars } from 'env';
import { getSingleNews } from 'utils/newsFetcher';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  
  const HeroSection = styled.div`
    animation: ${isAnimated ? fadeInUp : 'none'} 1s ease-in-out;
  `;

  useEffect(() => {
    setIsAnimated(true);
  },[isAnimated])

  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Rraf-Project, "
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <HeroSection>
            <Hero />

          <BasicSection title="Simple Project." overTitle="Simple Project" reversed>
            <p>
              I just make this project just for fun, you can find some <strong>latest news</strong>, <strong>play simple games</strong> and you can login to save your games in this website, <strong>break some puzzle</strong>. lot of feature that you can explore in this website.
            </p>
            <ul>
              <li>Safety website</li>
              <li>Using the latest security patch</li>
              <li>OAuth using google</li>
            </ul>
          </BasicSection>
      <AnimatedText>
          <Partners />
      </AnimatedText>
          </HeroSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <FeaturesGallery />
          <Features />
          <ScrollableBlogPosts posts={posts} />
        </DarkerBackgroundContainer>
  </HomepageWrapper>
    </>
  );
}

  
const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 15rem;
  }
`;

const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 4rem;
  }

  & > *:not(:first-child) {
    margin-top: 8rem;
  }
`;


const AnimatedText = styled.div`
  animation: bounce 2.5s infinite;

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.0);
    }
  }
`;


export async function getStaticProps() {
  return {
    props: {
      posts: await getSingleNews(),
    },
  };
}
