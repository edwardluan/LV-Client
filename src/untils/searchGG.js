export const handleSearch = async (text, setSearchResults) => {

    try {
        const apiKey = 'AIzaSyALZRfTj_ys1qQohQBveKKjlfyGHqB5-8U';
        const searchEngineId = '60d02ee2d80624d61';

        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${text}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        setSearchResults(data.items);

    } catch (error) {
        console.error(error);
    }
};