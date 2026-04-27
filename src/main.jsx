import { useEffect, useState } from 'react';

export default function App() {
  // Keep your existing state and logic
  // ...

  // Add state for AI news
  const [news, setNews] = useState('Loading AI news...');
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const messages = [
        { role: 'user', content: 'Give me a short summary of global markets news.' }
      ];

      try {
        const res = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        setNews(data.completion || 'No news available');
      } catch (err) {
        console.error(err);
        setNewsError('Failed to load AI news');
        setNews('');
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {/* Keep all your existing UI here */}

      {/* New AI news section */}
      <section>
        <h2>AI-generated News</h2>
        {newsError ? (
          <p style={{ color: 'red' }}>{newsError}</p>
        ) : (
          <p>{news}</p>
        )}
      </section>
    </div>
  );
}
