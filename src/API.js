const API = {
    getFeedItems: async (feedId, isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId: feedId,
            isDescOrder: isDescOrder
        }));
        return await response.json();
    },

    getAllItems: async (isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            isDescOrder: isDescOrder
        }));
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
