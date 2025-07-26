// src/components/Background.jsx
import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const Background = () => {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        preset: 'links',
        background: { color: { value: '#050A30' } }, // dark navy blue
        fullScreen: { enable: false }, // since we control it via CSS
        particles: {
          color: { value: '#00ffff' },
          links: {
            enable: true,
            distance: 150,
            opacity: 0.3,
            width: 1,
            color: '#00ffff'
          },
          move: { enable: true, speed: 2.5, outModes: { default: 'bounce' } },
          number: { value: 100, density: { enable: true, area: 800 } },
          opacity: { value: 0.5 },
          size: { value: 2 },
          shape: { type: 'circle' },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 }
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Background;
