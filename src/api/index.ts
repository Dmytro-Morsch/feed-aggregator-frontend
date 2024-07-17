import instance from './instance';

import usersModule from './user.ts';
import itemsModule from './item.ts';
import feedsModule from './feed.ts';

export default {
  users: usersModule(instance),
  items: itemsModule(instance),
  feeds: feedsModule(instance)
};
