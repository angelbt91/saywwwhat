import { useEffect, useState } from "react";
import MyHead from "@/components/MyHead";
import Transcript from "@/components/Transcript";
import RecordButton from "@/components/RecordButton";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Home() {
  const [support, setSupport] = useState(true);
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const {
    listening,
    transcript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) setSupport(false);
  }, [browserSupportsSpeechRecognition]);

  const handleClick = async () => {
    if (!listening) {
      resetTranscript();
      return SpeechRecognition.startListening({ continuous: true });
    }

    if (finalTranscript === "") return;

    setProcessing(true);
    try {
      SpeechRecognition.stopListening();
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalTranscript }),
      });
      const json = await response.json();
      setCode(json.code);
    } catch (e) {
      console.error(e);
    }
    setProcessing(false);
  };

  return (
    <>
      <MyHead />
      <main className="flex justify-center min-h-screen">
        <div className="container h-full p-10">
          {!support ? (
            <p>This browser does not support speech recognition.</p>
          ) : (
            <div className="flex flex-col h-full justify-center items-center">
              <RecordButton listening={listening} processing={processing} onClick={handleClick} />
              <Transcript transcript={transcript} />
              {code && (
                <iframe
                  className="border-solid border-2 border-indigo-600 rounded-lg mt-6"
                  srcDoc={code}
                  width="900"
                  height="1200"
                ></iframe>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
