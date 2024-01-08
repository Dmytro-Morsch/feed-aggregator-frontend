function Feeds({feeds, onFeedSelected}) {

    return (
        <ul>
            <li><a href="#" onClick={() => onFeedSelected(null)}>All</a></li>
            {feeds.map(feed => {
                return (
                    <li key={feed.id}>
                        <a href="#" onClick={() => onFeedSelected(feed.id)}>{feed.title}</a>
                    </li>
                )
            })}
        </ul>
    );
}

export default Feeds;
