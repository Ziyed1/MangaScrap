'use client';
import { useEffect, useState } from 'react';

interface Favori {
  mangaId: string;
  currentChapter: number;
}

export default function Home() {
  const [favoris, setFavoris] = useState<Favori[]>([]);

  useEffect(() => {
    fetch('http://mangascrapper-alb-1813791256.eu-west-1.elb.amazonaws.com/api/favorites/user123')
      .then((res) => res.json())
      .then((data) => setFavoris(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mes mangas en cours</h1>
      <ul className="space-y-4">
        {favoris.map((fav) => (
          <li key={fav.mangaId} className="p-4 border rounded bg-white shadow">
            <p className="font-semibold">Manga ID : {fav.mangaId}</p>
            <p>Chapitre actuel : {fav.currentChapter}</p>
            <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">Reprendre</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
