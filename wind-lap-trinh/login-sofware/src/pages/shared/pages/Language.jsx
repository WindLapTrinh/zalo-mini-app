import React, { useState } from 'react';
import useTranslate from '../hooks/useTranslate'; // Import custom hook

const TranslatorComponent = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const { translation, loading, error, translateText } = useTranslate();

  const handleTranslate = () => {
    translateText(text, targetLanguage);
  };

  return (
    <div>
      <h1>Google Translate</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more languages as needed */}
      </select>
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {error && <p>Error: {error}</p>}
      {translation && <p>Translation: {translation}</p>}
    </div>
  );
};

export default TranslatorComponent;
