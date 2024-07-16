type FeedType = {
  id: number;
  title: string;
  description: string;
  feedLink: string;
  siteLink: string;
  loaded: boolean;
  countUnreadItems: number;
};

export default FeedType;
