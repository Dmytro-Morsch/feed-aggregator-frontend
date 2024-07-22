type ItemType = {
  id: number;
  feedId: number;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  guid: string;
  read: boolean;
  starred: boolean;
};

export default ItemType;
