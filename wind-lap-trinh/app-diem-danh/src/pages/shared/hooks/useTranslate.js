import { useState } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const useTranslate = () => {
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translateText = async (text, targetLanguage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          q: text,
          target: targetLanguage,
        }
      );
      setTranslation(response.data.data.translations[0].translatedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { translation, loading, error, translateText };
};

export default useTranslate;
