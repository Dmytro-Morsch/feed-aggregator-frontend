const API = {
    getFeedItems: async (feedId) => {
        const response = await fetch(`/api/items?feedId=${feedId}`);
        return await response.json();
    },

    getAllItems: async () => {
        const response = await fetch('/api/items');
        return await response.json();
    },

    postFeedLink: async (xmlLink) => {
        await fetch('/api/feed-link', {
            method: 'POST',
            body: xmlLink
        });
    },

    getFeeds: async () => {
        const response = await fetch('/api/feeds');
        return await response.json();
    },
}

export default API;
