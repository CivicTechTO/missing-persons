// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
  src = 'https://via.placeholder.com/250?text=Not+Available',
  alt,
  css,
}: ImageProps) => {
  return <BaseImage src={src} alt={alt} css={{ ...css }} loading="lazy" />;
};
