const API = {
    getFeedItems: async (feedId) => {
        const response = await fetch(`/api/items?feedId=${feedId}`);
        return await response.json();
    },

    getAllItems: async () => {
        const response = await fetch('/api/items');
        return await response.json();
    },

    postFeedLink: async (feedLink) => {
        await fetch('/api/feed-link', {
            method: 'POST',
            body: feedLink
        });
    },

    getFeeds: async () => {
        const response = await fetch('/api/feeds');
        return await response.json();
    }
}

export default API;
