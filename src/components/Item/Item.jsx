import "./Item.css";

function Item({item}) {
    const dateTimeConvert = () => {
        let isoDate = new Date(item.pubDate).toISOString();
        let date = isoDate.substring(0, 10);
        let time = isoDate.substring(11, 16);
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
