import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChapterPage({ params }) {
    const { chapterNumber } = params;
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchVerses() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chapters/chapter/${chapterNumber}`);
                if (!res.ok) throw new Error("Failed to fetch verses");
                const data = await res.json();
                setVerses(data);
            } catch (err) {
                setError("Failed to load verses");
            } finally {
                setLoading(false);
            }
        }
        fetchVerses();
    }, [chapterNumber]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Chapter {chapterNumber}</h1>
            <ul>
                {verses.map((verse, index) => (
                    <li key={index}>
                        <p><strong>Arabic Text:</strong> {verse.arabic_text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
