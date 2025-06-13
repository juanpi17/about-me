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

  const HEIGHT = canvas.height;
  const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;
  let x = 0;

  const yellowThreshold = HEIGHT * 0.4;
  const redThreshold = HEIGHT * 0.7;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] / 255) * HEIGHT;

    const greenHeight = Math.min(barHeight, yellowThreshold);
    if (greenHeight > 0) {
      canvasCtx.fillStyle = "#00ff00";
      canvasCtx.fillRect(x, HEIGHT - greenHeight, barWidth - 1, greenHeight);
    }

    if (barHeight > yellowThreshold) {
      const yellowHeight = Math.min(barHeight, redThreshold) - yellowThreshold;
      if (yellowHeight > 0) {
        canvasCtx.fillStyle = "#ffff00";
        canvasCtx.fillRect(
          x,
          HEIGHT - (greenHeight + yellowHeight),
          barWidth - 1,
          yellowHeight
        );
      }
    }

    if (barHeight > redThreshold) {
      const redHeight = barHeight - redThreshold;
      if (redHeight > 0) {
        canvasCtx.fillStyle = "#ff0000";
        canvasCtx.fillRect(
          x,
          HEIGHT - barHeight,
          barWidth - 1,
          redHeight
        );
      }
    }

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
      canvasCtx.translate(0, canvas.offsetHeight / 2);
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
        className="w-full h-full"
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
