function Item({item}) {
    return (
        <div>
            <h1>{item.title}</h1>
            <div>
                {item.description}
            </div>
            <a href={item.link}>Sources</a>
        </div>
    );
}

export default Item;
