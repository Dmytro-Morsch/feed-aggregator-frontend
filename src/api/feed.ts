import { AxiosInstance, AxiosResponse } from 'axios';
import FeedType from '../types/feedType.ts';
import ItemType from '../types/itemType.ts';

export default function (instance: AxiosInstance) {
  return {
    async subscribeToFeed(feedLink: FeedType['feedLink']): AxiosResponse<FeedType> {
      return instance.post<FeedType>('/feeds/subscribe', feedLink, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    },

    unsubscribeFromFeed(feedId: FeedType['id']) {
      instance.delete(`/feeds/${feedId}/unsubscribe`);
    },

    async updateFeed(feedId: FeedType['id'], descOrder: boolean) {
      const path =
        `/feeds/${feedId}/update?` +
        new URLSearchParams({
          descOrder: descOrder.toString()
        });
      return instance.post<ItemType[]>(path);
    },

    renameFeed(feedId: FeedType['id'], title: FeedType['title']) {
      instance.patch(`/feeds/${feedId}/rename`, title);
    },

    async getFeed(feedId: FeedType['id']): AxiosResponse<FeedType> {
      return instance.get<FeedType>(`/feeds/${feedId}`);
    },

    async getFeeds() {
      return instance.get<FeedType[]>('/feeds');
    }
  };
}
