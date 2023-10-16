import NextImage from 'next/image';
import NextLink from 'next/link';
import styled from 'styled-components';
import { media } from 'utils/media';

export interface NewsCardProps {
  title: string;
  thumbnail: string;
  pubDate: string;
  link: string;
  description: string;
}

export default function NewsCard({ title, thumbnail, pubDate, link, description }: NewsCardProps) {
  return (
    <NextLink href={link} passHref>
      <ArticleCardWrapper className="article-card-wrapper">
        <HoverEffectContainer>
          <Content>
          <ImageContainer>
            <ImageHolder src={thumbnail} alt={title} />
          </ImageContainer>
            <Title>{title}</Title>
            <Descriptions>{pubDate}</Descriptions>
            <Descriptions>{description}</Descriptions>
          </Content>
        </HoverEffectContainer>
      </ArticleCardWrapper>
    </NextLink>
  );
}

const ImageHolder = styled.img`
  position: flex;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: -35px;
  width: 60%;
  border-radius: 8px;
`

const ImageContainer = styled.div`
  position: relative;
  height: 16rem;
  
  &:before {
    display: block;
    content: '';
    width: 100%;
    padding: 5%;
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${media('<=desktop')} {
    width: 100%;
  }
`;

const ArticleCardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  height: 40rem;
  max-width: 35rem;
  overflow: hidden;
  text-decoration: none;
  border-radius: 0.6rem;
  background: rgb(var(--cardBackground));
  cursor: pointer;
  color: rgb(var(--text));
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

  & > * {
    margin-top: 1rem;
  }
`;

const Title = styled.h4`
  font-size: 1.8rem;

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
