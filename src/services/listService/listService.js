const renderList = list => (
    list.map(({ key, value }) => (
        <li key={key}>{ value }</li>
    ))
)

export const getRenderingStrategyByType = {
    ordered: list => (
        <ol>
            { renderList(list) }
        </ol>
    ),
    unordered: list => (
        <ul>
            { renderList(list) }
        </ul>
    ),
};