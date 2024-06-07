﻿export const booksApi = async () => {
    const res = await fetch("https://localhost:7153/api/book");
    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();
    return data;
}

export const getBookById = async (id: number) => {
    const res = await fetch(`https://localhost:7153/api/book/${id}`);
    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();
    return data;
}