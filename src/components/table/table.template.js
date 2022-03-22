const CODES = {
    A: 65,
    Z: 90,
};

// Первый параметр мы не будем использовать при передаче в map.
// Это для упрощения в map.(el, index) => {
//    return String.fromCharCode(CODES.A + index);
// }
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(row) {
    return function(_, index) {
        return `<div 
            class="cell" 
            contenteditable="true" 
            data-col="${index}"
            data-id="${row}:${index}"
            data-type="cell"
        ></div>
    `;
    };
}

function createRow(content, info = '') {
    const resizer = info
        ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">${info}${resizer}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        // Заполняем пустыми элементами.
        .fill('')
        // Добаляем индексы по порядку.
        .map(toChar)
        // Оборачиваем по шаблону. Синоним el => createCol(el)
        .map(toColumn)
        // Получаем строку.
        .join('');
    // Добавляем заголовки.
    rows.push(createRow(cols));
    // Наполняем строками таблицу.
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('');
        rows.push(createRow(cells, row + 1));
    }

    return rows.join('');
}
