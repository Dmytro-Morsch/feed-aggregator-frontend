import "./Item.css";

function Item({item}) {
    const dateTimeConvert = () => {
        let itemDate = new Date(item.pubDate);
        let isoDate = itemDate.toISOString();
        let date = isoDate.substring(0, 10);
        let time = itemDate.getHours() + ":" + isoDate.substring(14, 16);
        return date + '\n' + time;
    };

    return (
        <>
            <div className="item-header">
                <h1 className="title">{item.title}</h1>
                <span className="pubdate">{dateTimeConvert()}</span>
            </div>
            {item.description && <div className="description" dangerouslySetInnerHTML={{__html: item.description}}/>}
            <span><a className="source" href={item.link}>Source</a></span>
        </>
    );
}

export default Item;
