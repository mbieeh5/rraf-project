import NextLink from 'next/link';
import styled from 'styled-components';
import { media } from 'utils/media';

export interface basicCardNoImg {
  title: string;
  link: string;
  description: string;
}

export default function BasicCardNoImg({ title, link, description }: basicCardNoImg) {
  return (
    <NextLink href={link} passHref>
      <ArticleCardWrapper className="article-card-wrapper">
        <HoverEffectContainer>
        <Content>
          <Title>{title}</Title>
            <Descriptions>{description}</Descriptions>
        </Content>
        </HoverEffectContainer>
      </ArticleCardWrapper>
    </NextLink>
  );
}


const ArticleCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  height: 25rem;
  max-width: 35rem;
  overflow: hidden;
  text-decoration: none;
  border-radius: 1rem;
  background: rgb(var(--cardBackground));
  cursor: pointer;
  color: rgb(var(--text));
  box-shadow: 0 0 10px rgba(10, 10, 10, 0.1);
`;

const HoverEffectContainer = styled.div`
  transition: transform 0.3s;
  backface-visibility: hidden;
  will-change: transform;

  &:hover {
    border-radius: 0.6rem;
    overflow: hidden;
    transform: scale(1.025);
  }
`;

const Content = styled.div`
  padding: 0 2rem;
  margin: 1rem;
  margin-top: 12em
  & > * {
    margin-top: 1rem;
  }
`;

const Title = styled.h4`
  font-size: 1.8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Descriptions = styled.p`
  font-size: 1.6rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
