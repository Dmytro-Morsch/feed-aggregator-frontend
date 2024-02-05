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
    },

    getUser: async () => {
        const response = await fetch('/api/user');
        return await response.json();
    },

    markItemAsRead: async (markAsRead, itemId) => {
        await fetch(`/api/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                markAsRead
            })
        });
    },

    markAllAsRead: async (itemIds) => {
        await fetch('/api/items/mark-as-read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemIds)
        });
    }
}

export default API;
