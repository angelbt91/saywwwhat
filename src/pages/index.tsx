import { useEffect, useState } from "react";
import MyHead from "@/components/MyHead";
import RecordButton from "@/components/RecordButton";
import LanguageSelector from "@/components/LanguageSelector";
import Transcript from "@/components/Transcript";
import { useSpeechRecognition } from "react-speech-recognition";

export default function Home() {
  const [support, setSupport] = useState(true);
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [language, setLanguage] = useState("en-EN");
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

  return (
    <>
      <MyHead />
      <main className="flex justify-center min-h-screen">
        <div className="container h-full p-10">
          {!support ? (
            <p>This browser does not support speech recognition.</p>
          ) : (
            <div className="flex flex-col h-full justify-center items-center">
              <RecordButton
                listening={listening}
                processing={processing}
                setProcessing={setProcessing}
                finalTranscript={finalTranscript}
                resetTranscript={resetTranscript}
                language={language}
                setCode={setCode}
              />
              <LanguageSelector language={language} setLanguage={setLanguage} />
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
