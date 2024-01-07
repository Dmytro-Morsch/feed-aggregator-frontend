const API = {
    getItems: async () => {
        const response = await fetch('/api/items', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    },

    postXmlLink: async (xmlLink) => {
        await fetch('/api/xmlLink', {
            method: 'POST',
            body: xmlLink
        });
    }
}

export default API;
