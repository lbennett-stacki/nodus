
import styled, { StyledFunction } from "styled-components"

interface HoverScaleUpProps {
  off?: boolean;
}

export const HoverScaleUp = styled.div.attrs((props: HoverScaleUpProps) => {
  const hoverAnimations = 'transform hover:-translate-y-1 hover:scale-110'
  const base = 'transition duration-500 ease-in-out'
  return { className: `${base} ${hoverAnimations}` }
})<HoverScaleUpProps>``;
