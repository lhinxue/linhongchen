import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(motion.span)`
  /* Your custom styles here */
`;

const VisibilityControl = ({ duration=1000, active, inactivePreference='hide', children }) => {
  const [shouldRender, setShouldRender] = useState(active);

  useEffect(() => {
    if (active) {
      setShouldRender(true);
    }
  }, [active]);

  const handleAnimationComplete = () => {
    if (!active) {
      switch (inactivePreference) {
        case 'invisible':
          break;
        case 'hide':
          setShouldRender(false);
          break;
        case 'delete':
          setShouldRender(false);
          break;
        default:
          break;
      }
    }
  };

  const variants = {
    visible: { opacity: 1, display: 'block' },
    hidden: { opacity: 0, transitionEnd: { display: 'none' } },
  };

  return (
    <AnimatePresence>
      {shouldRender && (
        <Wrapper
          initial="hidden"
          animate={active ? 'visible' : 'hidden'}
          exit="hidden"
          variants={variants}
          transition={{ duration }}
          onAnimationComplete={handleAnimationComplete}
          style={
            !active && inactivePreference === 'invisible'
              ? { opacity: 0 }
              : {}
          }
        >
          {children}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default VisibilityControl;
