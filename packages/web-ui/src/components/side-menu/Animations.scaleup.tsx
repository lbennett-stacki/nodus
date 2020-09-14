import React from 'react';

interface ScaleUpProps {
  on?: boolean;
}

export const ScaleUp: React.FC<ScaleUpProps> = (props) => {
  const hoverAnimations = props.on ? 'transform -translate-y-1 scale-110' : ''
  const base = 'transition duration-300 ease-out'
  return (
    <div className={`${base} ${hoverAnimations}`}>
      {props.children}
    </div>
    )
}
