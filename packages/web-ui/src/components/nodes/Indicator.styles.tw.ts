
import styled, { StyledFunction } from "styled-components"

const IsometricTransform = {
  rotate3D: 'rotateX(60deg) rotateY(0deg) rotateZ(-45deg)',
  offset: 'translateY(0px) translateZ(-20px) translateX(-10px)'
}

export const NodeIndicator = styled.div.attrs((props) => {
  const base = 'rounded-full h-4 w-4 bg-white animate-pulse transition transition-opacity pointer-events-none'
  return { className: `${base}` }
})`
  transform: ${IsometricTransform.rotate3D} ${IsometricTransform.offset};
`;
