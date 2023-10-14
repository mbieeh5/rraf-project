import NextLink from 'next/link';
import styled from 'styled-components';

export interface NewsCardProps {
  title: string;
  url: string;
  tanggal: string;
}

export default function NewsCard({ title, url, tanggal }: NewsCardProps) {
  return (
    <NextLink href={url} passHref>
      <ArticleCardWrapper className="article-card-wrapper">
        <HoverEffectContainer>
          <Content>
            <Title>{title}</Title>
            <Descriptions>{tanggal}</Descriptions>
          </Content>
        </HoverEffectContainer>
      </ArticleCardWrapper>
    </NextLink>
  );
}

const ArticleCardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  height: 45rem;
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
    margin-top: 2rem;
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
