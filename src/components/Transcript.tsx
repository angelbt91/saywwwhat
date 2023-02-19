interface Props {
  transcript: string;
}

const Transcript: React.FC<Props> = ({ transcript }) => {
  return <p>{transcript}</p>;
};

export default Transcript;
