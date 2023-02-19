import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface Props {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSelector: React.FC<Props> = ({ language, setLanguage }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <select
        value={language}
        onChange={handleChange}
        className="block p-2 m-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="en-EN">English</option>
        <option value="es-ES">Spanish</option>
      </select>
    </>
  );
};

export default LanguageSelector;
