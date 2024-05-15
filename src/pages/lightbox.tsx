import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import ImgColWrapper from '../wrappers/ImageColWrapper';
import Lightbox from 'react-image-lightbox';
import * as LightboxCSS from '@/styles/lightbox/lightbox.css';
import styled from 'styled-components';

interface CompPageProps {
  data: any;
  gutter: string;
  rowMargin: number;
  lightboxOptions: {};
  onClose: () => void;
}

const StyledLightbox = styled(Lightbox)`
  ${LightboxCSS}
`;

const CompPage: React.FC = ({
  data,
  gutter = '0.25rem',
  rowMargin = 0,
  lightboxOptions = {},
  onClose = () => {},
}: CompPageProps) => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = data.allFile.edges.map(({ node }) => node.childImageSharp);

  const prevIndex = (index + images.length - 1) % images.length;
  const nextIndex = (index + images.length + 1) % images.length;

  // URLs for full width images
  const mainSrc = images[index]?.full?.images?.fallback?.src;
  const nextSrc = images[nextIndex]?.full?.images?.fallback?.src;
  const prevSrc = images[prevIndex]?.full?.images?.fallback?.src;

  const onCloseLightbox = () => {
    onClose();
    setIsOpen(false);
  };

  return (
    <div>
      <div className="homemade-container-sm mx-auto d-flex flex-column align-items-center">
        <div className="inner-container">
          <hr className="m-0" />
          <h1 className="pt-4">Composites</h1>
          <div className="pt-3">
            <div
              className="d-flex flex-wrap"
              style={{ margin: rowMargin + 'px' }}
            >
              {images.map(
                (img: { thumb: IGatsbyImageData }, imgIndex: number) => {
                  const thumbImage = getImage(img.thumb);
                  if (!thumbImage) {
                    return null;
                  }
                  return (
                    <ImgColWrapper
                      key={imgIndex}
                      gutter={gutter}
                      onClick={() => {
                        setIsOpen(true);
                        setIndex(imgIndex);
                      }}
                    >
                      <GatsbyImage image={thumbImage} alt={`testing`} />
                    </ImgColWrapper>
                  );
                },
              )}
            </div>
            {isOpen && (
              <Lightbox
                mainSrc={mainSrc || ''}
                nextSrc={nextSrc || ''}
                prevSrc={prevSrc || ''}
                onCloseRequest={onCloseLightbox}
                onMovePrevRequest={() => setIndex(prevIndex)}
                onMoveNextRequest={() => setIndex(nextIndex)}
                imageTitle={images[index].title}
                imageCaption={images[index].caption}
                {...lightboxOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompPage;

export const portfolioQuery = graphql`
  query CompImages {
    allFile(filter: { relativeDirectory: { eq: "lightbox" } }) {
      edges {
        node {
          id
          childImageSharp {
            thumb: gatsbyImageData(
              width: 175
              height: 175
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
