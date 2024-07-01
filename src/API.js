const API = {
    getFeedItems: async (feedId, descOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId,
            descOrder
        }));
        return await response.json();
    },

    getAllUserItems: async (descOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            descOrder
        }));
        return await response.json();
    },

    getAllUnreadItems: async (descOrder, unreadOnly) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            descOrder,
            unreadOnly
        }));
        return await response.json();
    },

    getFeedUnreadItems: async (feedId, descOrder, unreadOnly) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId,
            descOrder,
            unreadOnly
        }));
        return await response.json();
    },

    postFeedLink: async (feedLink) => {
        const response = await fetch('/api/feeds/subscribe', {
            method: 'POST',
            body: feedLink
        });
        return await response.json();
    },

    updateFeed: async (feedId, descOrder) => {
        const response = await fetch(`/api/feeds/${feedId}/update?` + new URLSearchParams({
            descOrder
        }), {
            method: 'POST'
        });
        return await response.json();
    },

    getUser: async () => {
        const response = await fetch('/api/user');
        return await response.json();
    },

    markItemRead: async (read, itemId) => {
        await fetch(`/api/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(read)
        });
    },

    markAllRead: async (itemIds) => {
        await fetch('/api/items/all/read', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemIds)
        });
    },

    getFeeds: async () => {
        const response = await fetch('/api/feeds');
        return await response.json();
    },

    unsubscribeFromFeed: async (feedId) => {
        await fetch(`/api/feeds/${feedId}/unsubscribe`, {
            method: 'DELETE'
        });
    },

    renameFeed: async (feedId, title) => {
        await fetch(`/api/feeds/${feedId}/rename`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title)
        });
    }
}

export default API;
