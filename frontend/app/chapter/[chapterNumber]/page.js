"use client";

import { useEffect, useState } from 'react';

export default function ChapterPage({ params = {} }) {
    const { chapterNumber } = params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchVerses() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chapter/${chapterNumber}`);
                if (!response.ok) throw new Error("Failed to fetch verses");
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.message || "Failed to load verses");
            } finally {
                setLoading(false);
            }
        }
        if (chapterNumber) {
            fetchVerses();
        }
    }, [chapterNumber]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Chapter {chapterNumber}</h1>
            <ul>
                {data.map((object) => (
                    <li key={object.verse_number}>
                        <p><strong>{object.verse_number}:</strong> {object.diacritic_arabic_text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
