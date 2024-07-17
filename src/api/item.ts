import { AxiosInstance } from 'axios';
import ItemType from '../types/itemType.ts';
import FeedType from '../types/feedType.ts';

export default function (instance: AxiosInstance) {
  return {
    getFeedItems(feedId: FeedType['id'], descOrder: boolean) {
      const path =
        '/items?' +
        new URLSearchParams({
          feedId: feedId.toString(),
          descOrder: descOrder.toString()
        });
      return instance.get<ItemType[]>(path);
    },

    getAllUserItems(descOrder: boolean, starOnly: boolean) {
      const path =
        '/items?' +
        new URLSearchParams({
          descOrder: descOrder.toString(),
          starOnly: starOnly.toString()
        });
      return instance.get<ItemType[]>(path);
    },

    getAllUnreadItems(descOrder: boolean, unreadOnly: boolean) {
      const path =
        '/items?' +
        new URLSearchParams({
          descOrder: descOrder.toString(),
          unreadOnly: unreadOnly.toString()
        });
      return instance.get<ItemType[]>(path);
    },

    getFeedUnreadItems(feedId: FeedType['id'], descOrder: boolean, unreadOnly: boolean) {
      const path =
        '/items?' +
        new URLSearchParams({
          feedId: feedId.toString(),
          descOrder: descOrder.toString(),
          unreadOnly: unreadOnly.toString()
        });
      return instance.get<ItemType[]>(path);
    },

    markItemRead(read: ItemType['read'], itemId: ItemType['id']) {
      instance.patch(`/items/${itemId}/read`, read);
    },

    markAllRead(itemIds: ItemType['id'][]) {
      instance.patch('/items/all/read', itemIds);
    },

    markItemStar(starred: ItemType['starred'], itemId: ItemType['id']) {
      instance.patch(`/items/${itemId}/star`, starred);
    }
  };
}
