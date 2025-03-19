import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import "./WordCloud.css";

const WordCloud = ({ words }) => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Compute placements without recentering.
  const placements = useMemo(() => {
    // Measure text width using canvas.
    const measureTextWidth = (text, fontSize) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = `${fontSize}px sans-serif`;
      return context.measureText(text).width;
    };

    const placed = [];
    const baseFontSize = 20;
    const delta = 0.3; // radians increment per spiral step
    const step = 5;    // pixel step for radius

    // Create a rectangle centered at (x,y)
    const createRect = (x, y, width, height) => ({
      left: x - width / 2,
      right: x + width / 2,
      top: y - height / 2,
      bottom: y + height / 2,
    });

    words.forEach((word, index) => {
      // Higher priority words are larger.
      const fontSize = baseFontSize + (words.length - index) * 2;
      const width = measureTextWidth(word, fontSize);
      const height = fontSize; // approximate text height

      let x = 0;
      let y = 0;
      if (index === 0) {
        x = 0;
        y = 0;
      } else {
        let found = false;
        let t = 0;
        while (!found && t < 1000) {
          const angle = t * delta;
          const radius = step * t;
          const candidateX = radius * Math.cos(angle);
          const candidateY = radius * Math.sin(angle);
          const candidateRect = createRect(candidateX, candidateY, width, height);

          // Check for collisions with already placed words.
          const collision = placed.some((p) => {
            const r = p.rect;
            return !(
              candidateRect.right < r.left ||
              candidateRect.left > r.right ||
              candidateRect.bottom < r.top ||
              candidateRect.top > r.bottom
            );
          });

          if (!collision) {
            x = candidateX;
            y = candidateY;
            found = true;
            break;
          }
          t++;
        }
      }

      placed.push({
        word,
        x,
        y,
        fontSize,
        opacity: 1 - index / words.length,
        rect: createRect(x, y, width, height),
      });
    });
    return placed;
  }, [words]);

  // After rendering, measure the actual positions and compute the corrective offset.
  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const wordElements = containerRef.current.querySelectorAll(".word");
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      wordElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Get position relative to the container.
        const left = rect.left - containerRect.left;
        const top = rect.top - containerRect.top;
        const right = left + rect.width;
        const bottom = top + rect.height;
        minX = Math.min(minX, left);
        maxX = Math.max(maxX, right);
        minY = Math.min(minY, top);
        maxY = Math.max(maxY, bottom);
      });
      const groupCenterX = (minX + maxX) / 2;
      const groupCenterY = (minY + maxY) / 2;
      const containerCenterX = containerRect.width / 2;
      const containerCenterY = containerRect.height / 2;
      setOffset({
        x: containerCenterX - groupCenterX,
        y: containerCenterY - groupCenterY,
      });
    }
  }, [placements]);

  return (
    <div className="word-cloud-container" ref={containerRef}>
      <div
        className="word-cloud-group"
        // style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {placements.map((item, index) => (
          <motion.span
            key={index}
            className="word"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: item.opacity, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              left: `calc(50% + ${item.x}px)`,
              top: `calc(50% + ${item.y}px)`,
              fontSize: `${item.fontSize}px`,
            }}
          >
            {item.word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default WordCloud;
