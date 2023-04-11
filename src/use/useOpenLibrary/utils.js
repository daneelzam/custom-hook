/**
 * fetchInfoOpenLibrary - функция для запроса информации о книгах и авторах с помощью API Open Library.
 * @param {string} query - поисковый запрос.
 * @returns {Promise} - промис с результатом запроса.
 * @throws {Error} - если запрос завершился ошибкой.
 * */
export const fetchInfoOpenLibrary = async (query) => {
    try {
        const response = await fetch(`http://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        return data.docs;
    } catch (error) {
        throw error;
    }
};