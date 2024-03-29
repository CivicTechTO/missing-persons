import { styled } from '@stitches/react';

interface ImageProps {
  src?: string;
  alt: string;
  css?: React.CSSProperties;
}

export const BaseImage = styled('img', {
  width: '250px',
  height: '250px',
  objectFit: 'cover',
});

export const Image = ({
  src = 'https://placehold.co/600x400?text=Not+Available',
  alt,
  css,
}: ImageProps) => {
  return <BaseImage src={src} alt={alt} css={{ ...css }} loading="lazy" />;
};
