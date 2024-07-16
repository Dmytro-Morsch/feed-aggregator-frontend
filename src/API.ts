import UserType from './types/userType.js';
import FeedType from './types/feedType.ts';
import ItemType from './types/itemType.ts';

const API = {
  getFeedItems: async (feedId: FeedType['id'], descOrder: boolean) => {
    const response = await fetch(
      '/api/items?' +
        new URLSearchParams({
          feedId: feedId.toString(),
          descOrder: descOrder.toString()
        })
    );
    return (await response.json()) as ItemType[];
  },

  getAllUserItems: async (descOrder: boolean, starOnly: boolean) => {
    const response = await fetch(
      '/api/items?' +
        new URLSearchParams({
          descOrder: descOrder.toString(),
          starOnly: starOnly.toString()
        })
    );
    return (await response.json()) as ItemType[];
  },

  getAllUnreadItems: async (descOrder: boolean, unreadOnly: boolean) => {
    const response = await fetch(
      '/api/items?' +
        new URLSearchParams({
          descOrder: descOrder.toString(),
          unreadOnly: unreadOnly.toString()
        })
    );
    return (await response.json()) as ItemType[];
  },

  getFeedUnreadItems: async (feedId: FeedType['id'], descOrder: boolean, unreadOnly: boolean) => {
    const response = await fetch(
      '/api/items?' +
        new URLSearchParams({
          feedId: feedId.toString(),
          descOrder: descOrder.toString(),
          unreadOnly: unreadOnly.toString()
        })
    );
    return (await response.json()) as ItemType[];
  },

  subscribeToFeed: async (feedLink: FeedType['feedLink']) => {
    const response = await fetch('/api/feeds/subscribe', {
      method: 'POST',
      body: feedLink
    });
    return (await response.json()) as FeedType;
  },

  updateFeed: async (feedId: FeedType['id'], descOrder: boolean) => {
    const response = await fetch(
      `/api/feeds/${feedId}/update?` +
        new URLSearchParams({
          descOrder: descOrder.toString()
        }),
      {
        method: 'POST'
      }
    );
    return (await response.json()) as ItemType[];
  },

  getUser: async () => {
    const response = await fetch('/api/user');
    return (await response.json()) as UserType;
  },

  markItemRead: async (read: ItemType['read'], itemId: ItemType['id']) => {
    await fetch(`/api/items/${itemId}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(read)
    });
  },

  markAllRead: async (itemIds: ItemType['id'][]) => {
    await fetch('/api/items/all/read', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemIds)
    });
  },

  markItemStar: async (starred: ItemType['starred'], itemId: ItemType['id']) => {
    await fetch(`/api/items/${itemId}/star`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(starred)
    });
  },

  getFeeds: async () => {
    const response = await fetch('/api/feeds');
    return (await response.json()) as FeedType[];
  },

  getFeed: async (feedId: FeedType['id']) => {
    const response = await fetch(`/api/feeds/${feedId}`);
    return (await response.json()) as FeedType;
  },

  unsubscribeFromFeed: async (feedId: FeedType['id']) => {
    await fetch(`/api/feeds/${feedId}/unsubscribe`, {
      method: 'DELETE'
    });
  },

  renameFeed: async (feedId: FeedType['id'], title: FeedType['title']) => {
    await fetch(`/api/feeds/${feedId}/rename`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(title)
    });
  },

  getUnreadItemsCount: async (feedId: FeedType['id']) => {
    const response = await fetch(`/api/feeds/${feedId}/items-count`);
    return (await response.json()) as number;
  }
};

export default API;
