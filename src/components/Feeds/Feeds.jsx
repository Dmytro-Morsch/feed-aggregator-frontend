import "./Feeds.css";

function Feeds({feeds, onFeedSelected}) {

    return (
        <ul className="feed-list">
            <li className="feed-list__item"><a href="#" className="feed" onClick={() => onFeedSelected(null)}>All</a>
            </li>
            {feeds.map(feed => {
                return (
                    <li className="feed-list__item" key={feed.id}>
                        <a href="#" className="feed" onClick={() => onFeedSelected(feed.id)}>{feed.title}</a>
                    </li>
                )
            })}
        </ul>
    );
}

export default Feeds;
