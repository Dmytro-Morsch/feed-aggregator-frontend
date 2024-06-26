const API = {
    getFeedItems: async (feedId, isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId,
            isDescOrder
        }));
        return await response.json();
    },

    getAllUserItems: async (isDescOrder) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            isDescOrder
        }));
        return await response.json();
    },

    getAllUnreadItems: async (isDescOrder, isUnreadPosts) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            isDescOrder,
            isUnreadPosts
        }));
        return await response.json();
    },

    getFeedUnreadItems: async (feedId, isDescOrder, isUnreadPosts) => {
        const response = await fetch('/api/items?' + new URLSearchParams({
            feedId,
            isDescOrder,
            isUnreadPosts
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

    updateFeed: async (feedId, isDescOrder) => {
        const response = await fetch(`/api/feeds/${feedId}/update?` + new URLSearchParams({
            isDescOrder
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
