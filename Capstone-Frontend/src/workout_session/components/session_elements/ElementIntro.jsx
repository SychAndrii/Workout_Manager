import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const ElementIntro = ({ message, children }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [fadeBoth, setFadeBoth] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Control the black screen and message overlay
  const overlayAnimation = useSpring({
    to: { opacity: fadeBoth ? 0 : 1 },
    from: { opacity: 1 },
    onRest: () => {
      // When the overlay is not needed, prevent it from affecting layout
      if (fadeBoth) {
        setShowContent(true);
      }
    },
  });

  // Adjust the message appearance on top of the black screen
  const messageAnimation = useSpring({
    to: { opacity: showMessage ? 1 : 0 },
    from: { opacity: 0 },
    delay: showMessage ? 500 : 0,
  });

  // Manage content appearance after the overlay is gone
  const contentAnimation = useSpring({
    to: { opacity: showContent ? 1 : 0 },
    from: { opacity: 0 },
    delay: showContent ? 500 : 0
  });

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    const fadeTimer = setTimeout(() => {
      setFadeBoth(true);
    }, 3000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!showContent && (
        <animated.div
          style={{
            ...overlayAnimation,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#F97316',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: fadeBoth ? 'none' : 'auto',
          }}
        >
          <animated.div
            style={{
              ...messageAnimation,
              color: 'white',
            }}
          >
            {message}
          </animated.div>
        </animated.div>
      )}
      <animated.div
        style={{
          ...contentAnimation,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

export default ElementIntro;
