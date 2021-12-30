import styled from 'styled-components/native';

interface IImageProps {
  imgWidth?: string;
  imgHeight?: string;
  radius?: string;
}
export const Img = styled.Image<IImageProps>`
  ${({ imgWidth }) => imgWidth && 'width:' + imgWidth};
  ${({ imgHeight }) => imgHeight && 'height:' + imgHeight};
  ${({ radius }) => radius && 'border-radius:' + radius};
`;
