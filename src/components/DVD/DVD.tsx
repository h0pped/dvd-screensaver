import { useEffect, useRef, useState } from "react";
import "./styles.css";

type DirectionX = "left" | "right";
type DirectionY = "top" | "bottom";

const DVD: React.FC = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
  const [boxPosition, setboxPosition] = useState({ x: 0, y: 0 });

  const [directionY, setDirectionY] = useState<DirectionY>("bottom");
  const [directionX, setDirectionX] = useState<DirectionX>("left");

  useEffect(() => {
    setFieldSize({
      width: fieldRef.current?.offsetWidth || 0,
      height: fieldRef.current?.offsetHeight || 0,
    });
  }, []);

  useEffect(() => {
    const setLogic = () => {
      if (!boxRef.current) {
        return;
      }

      const hasGotLeft = boxPosition.x + boxRef.current.offsetLeft === 0;
      const hasGotRight = boxPosition.x + 20 + 2 === fieldSize.width;

      const hasGotTop = boxPosition.y - 1 === 0;
      const hasGotBottom = boxPosition.y + 20 + 2 === fieldSize.height;
      if (hasGotRight) {
        setDirectionX("left");
      } else if (hasGotLeft) {
        setDirectionX("right");
      }
      if (hasGotTop) {
        setDirectionY("bottom");
      }
      if (hasGotBottom) {
        setDirectionY("top");
      }
      if (directionY === "bottom" && directionX === "right") {
        setboxPosition((prev) => ({
          x: prev.x + 1,
          y: prev.y + 1,
        }));
      }
      if (directionY === "bottom" && directionX === "left") {
        setboxPosition((prev) => ({
          x: prev.x - 1,
          y: prev.y + 1,
        }));
      }
      if (directionY === "top" && directionX === "right") {
        setboxPosition((prev) => ({
          x: prev.x + 1,
          y: prev.y - 1,
        }));
      }
      if (directionY === "top" && directionX === "left") {
        setboxPosition((prev) => ({
          x: prev.x - 1,
          y: prev.y - 1,
        }));
      }
    };

    const interval = setInterval(() => {
      setLogic();
    }, 10);
    return () => clearInterval(interval);
  }, [fieldSize, boxPosition.x, boxPosition.y, directionX, directionY]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.left = `${boxPosition.x}px`;
      boxRef.current.style.top = `${boxPosition.y}px`;
    }
  }, [boxPosition]);

  return (
    <div className="field" ref={fieldRef}>
      <div className="box" ref={boxRef}></div>
    </div>
  );
};

export default DVD;
