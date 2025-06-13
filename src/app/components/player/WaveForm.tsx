import { useRef, useEffect } from "react";

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

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const HEIGHT = canvas.height * 2;
  const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;
  let barHeight: number;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * HEIGHT;

    const gradient = canvasCtx.createLinearGradient(
      x, HEIGHT - barHeight, x, HEIGHT
    );
    gradient.addColorStop(0, "#ff0000"); // Rojo en la parte alta
    gradient.addColorStop(1, "#00ff00"); // Verde en la base

    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

const WaveForm = ({ analyserData }: WaveFormProps) => {
  const canvasRef = useRef(null);
  const { dataArray, analyser, bufferLength } = analyserData;

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
    <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
      <canvas
        className="w-full h-full mx-3"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
        ref={canvasRef}
      />
    </div>
  );
};

export default WaveForm;
