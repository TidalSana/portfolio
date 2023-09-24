import { keyframes } from '@chakra-ui/react';
/** Framer Motion */
const imageKeyFrames = keyframes`
  0%   { opacity: 0; scale: 0; }
  25%  { opacity: 0.7; }
  50%  { opacity: 1; scale: 1 }
`;

const bioAnimationKeyFrames = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const typingKeyFrames = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkKeyFrames = keyframes`
  from { border-color: transparent }
  to   { border-color:  '#b33e69'}
`;

interface AnimationsType {
  imageAnimation: string,
  headingAnimation: string,
  typingAnimation: string,
}

const animations: AnimationsType = {
  imageAnimation: `${imageKeyFrames} 1s ease-out`,
  headingAnimation: `${bioAnimationKeyFrames} 0.5s ease-in`,
  typingAnimation: `${typingKeyFrames} 1s steps(20, end) forwards, ${blinkKeyFrames} 1s infinite`,
};

export default animations;
