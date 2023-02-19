import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpeechRecognition from "react-speech-recognition";

interface Props {
  listening: boolean;
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  finalTranscript: string;
  resetTranscript: () => void;
  language: string;
  setCode: Dispatch<SetStateAction<string>>;
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

const RecordButton: React.FC<Props> = ({
  listening,
  processing,
  setProcessing,
  finalTranscript,
  resetTranscript,
  language,
  setCode,
}) => {
  const dots = useDots(processing);

  const handleClick = async () => {
    if (!listening) {
      resetTranscript();
      return SpeechRecognition.startListening({ continuous: true, language });
    }

    if (finalTranscript === "") return;

    setProcessing(true);
    try {
      SpeechRecognition.stopListening();
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalTranscript, language }),
      });
      const json = await response.json();
      setCode(json.code);
    } catch (e) {
      console.error(e);
    }
    setProcessing(false);
  };

  return (
    <button
      disabled={processing}
      onClick={handleClick}
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
