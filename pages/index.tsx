import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import { EnvVars } from 'env';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import { getSingleNews } from 'utils/newsFetcher';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
        />
      </Head>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <BasicSection imageUrl="/demo-illustration-2.svg" title="Simple Project." overTitle="Simple Project" reversed>
            <p>
              I just make this project just for fun, you can find some <strong>latest news</strong>, <strong>play simple games</strong> and you can login to save your games in this website, <strong>break some puzzle</strong>. lot of feature that you can explore in this website.
            </p>
            <ul>
              <li>Safety website</li>
              <li>Using the latest security patch</li>
              <li>OAuth using google</li>
            </ul>
          </BasicSection>
          <Partners />
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

export async function getStaticProps() {
  return {
    props: {
      posts: await getSingleNews(),
    },
  };
}
