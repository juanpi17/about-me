import { useRef, useEffect } from "react";
import useSize from "./useSize";

interface AnimateBarsProps {
  analyser: AnalyserNode;
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  dataArray: Uint8Array;
  bufferLength: number;
}

interface WaveFormProps {
  analyserData: {
    dataArray: Uint8Array;
    analyser: AnalyserNode;
    bufferLength: number;
  };
}

interface AnimateProps {
  dataArray: Uint8Array;
  analyser: AnalyserNode;
  bufferLength: number;
}

function animateBars({
  analyser,
  canvas,
  canvasCtx,
  dataArray,
  bufferLength
}: AnimateBarsProps) {
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = "#000";

  const HEIGHT = canvas.height / 2;

  const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;
  let barHeight: number;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * HEIGHT;
      const blueShade = Math.floor((dataArray[i] / 255) * 5); // generate a shade of blue based on the audio input
      const blueHex = ["#61dafb", "#5ac8fa", "#50b6f5", "#419de6", "#20232a"][
          blueShade
      ]; // use react logo blue shades
      canvasCtx.fillStyle = blueHex;
      canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
  }
}

const WaveForm = ({ analyserData }: WaveFormProps) => {
  const canvasRef = useRef(null);
  const { dataArray, analyser, bufferLength } = analyserData;
  const [width, height] = useSize();

  const draw = ({dataArray, analyser, bufferLength}:AnimateProps) => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const animate = () => {
      requestAnimationFrame(animate);
      canvas.width = canvas.width;
      canvasCtx.translate(0, canvas.offsetHeight / 2 - 115);
      animateBars({analyser, canvas, canvasCtx, dataArray, bufferLength});
    };

    animate();
  };

  useEffect(() => {
    draw({dataArray, analyser, bufferLength});
  }, [dataArray, analyser, bufferLength]);

  return (
    <canvas
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "-10"
      }}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default WaveForm;
