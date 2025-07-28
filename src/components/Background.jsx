// ParticlesBackground.jsx
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Styles from "../Css/Background.module.css";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          className={Styles.tsParticles}
          options={{
            background: {
              color: { value: "#050A30" }, // Deep navy blue
            },
            fullScreen: { enable: false }, // Set to false if you're handling layout with CSS
            fpsLimit: 120,
            particles: {
              color: { value: "#00ffff" },
              links: {
                enable: true,
                distance: 150,
                opacity: 0.3,
                width: 2,
                color: "#00ffff",
              },
              move: {
                enable: true,
                speed: 2.5,
                outModes: { default: "bounce" },
              },
              number: {
                value: 200,
                density: { enable: true, area: 800 },
              },
              opacity: { value: 0.5 },
              size: { value: 2 },
              shape: { type: "circle" },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 200,
                  links: { opacity: 0.5 },
                },
                push: { quantity: 4 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}
