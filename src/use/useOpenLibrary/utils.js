/**
 * fetchInfoOpenLibrary - a function to query information about books and authors using the Open Library API.
 * @param {string} query - search query.
 * @returns {Promise<{
 * key: 'string', title: 'string', author_name: string[], first_publish_year: number
 * }[]>} - a promise with the result of the request.
 * @throws {Error} - if the request fails.
 * */
export const fetchInfoOpenLibrary = async (query) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        return data.docs;
    } catch (error) {
        throw error;
    }
};