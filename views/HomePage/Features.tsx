import React from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Container from 'components/Container';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'Latest Security Patch.',
    description:
      'Implement strict authorization and authentication to ensure that only legitimate users have access to specific areas of the website, especially if there is sensitive data to protect.',
  },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'Ad-Free Experience.',
    description:
      ' there are no embedded or disruptive ads on the website to maintain a professional and focused user experience.',
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'News Feature.',
    description:
      'Organize news into various categories so that users can easily find the information they are looking for.',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'Blog Feature.',
    description:
      'Offer a blog with various types of content such as articles, guides, tutorials, and more that are relevant to your websites topic.',
  },
];

export default function Features() {
  return (
    
    <Container>
      <CustomAutofitGrid>
        {FEATURES.map((singleFeature, idx) => (
        <AnimatedElement key={singleFeature.title}>
          <BasicCard  {...singleFeature} />
        </AnimatedElement>
          ))}
      </CustomAutofitGrid>
    </Container>
  );
}
const AnimatedElement = styled.div`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(0.9);
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
