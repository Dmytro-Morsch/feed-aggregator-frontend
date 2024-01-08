import "./Item.css";

function Item({item}) {
    const dateConvert = (pubDate) => {
        return new Date(pubDate).toISOString().substring(0, 10);
    };

    const timeConvert = (pubDate) => {
        let date = new Date(pubDate);
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return hours + ':' + date.getMinutes() + ' ' + ampm;
    };

    return (
        <>
            <div className="item-header">
                <h1 className="title">{item.title}</h1>
                <span className="pubdate">{dateConvert(item.pubDate) + '\n' + timeConvert(item.pubDate)}</span>
            </div>
            {item.description && <span className="description">
                {item.description}
            </span>}
            <span><a className="source" href={item.link}>Sources</a></span>
        </>
    );
}

export default Item;
