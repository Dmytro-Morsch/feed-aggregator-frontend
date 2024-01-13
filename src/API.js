const API = {
    getFeedItems: async (feedId, isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId,
            isDescOrder
        }));
        return await response.json();
    },

    getAllItems: async (isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            isDescOrder
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
    },

    updateFeed: async (feedId, isDescOrder) => {
        const response = await fetch(`/api/feeds/${feedId}/update?` + new URLSearchParams({
            isDescOrder
        }), {
            method: 'POST'
        });
        return await response.json();
    }
}

export default API;
