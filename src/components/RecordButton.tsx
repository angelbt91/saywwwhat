import { useEffect, useState } from "react";

interface Props {
  listening: boolean;
  processing: boolean;
  onClick: () => void;
}

const useDots = (enabled: boolean) => {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (enabled) {
      interval = setInterval(() => {
        setDots((prev) => (prev === "..." ? "." : prev + "."));
      }, 500);
    }

    return () => clearInterval(interval);
  });

  return dots;
};

const RecordButton: React.FC<Props> = ({ listening, processing, onClick }) => {
  const dots = useDots(processing);

  return (
    <button
      disabled={processing}
      onClick={onClick}
      className="w-72 h-72 rounded-full bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
    >
      {processing
        ? `Generating website${dots}`
        : listening
        ? "Listening...\nClick to stop"
        : "Start listening"}
    </button>
  );
};

export default RecordButton;
