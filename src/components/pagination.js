import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    let pageCount;

    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // @todo: #2.6 — обработать действия
        if (action) switch (action.name) {
            case 'prev': page = Math.max(1, page - 1); break;
            case 'next': page = (pageCount ? Math.min(pageCount, page + 1) : page + 1); break;
            case 'first': page = 1; break;
            case 'last': page = pageCount ?? page; break;
        }

        return Object.assign({}, query, {limit, page});
    };

    const updatePagination = (total, {page, limit}) => {
        pageCount = Math.max(1, Math.ceil(total / limit));
        const currentPage = Math.max(1, Math.min(pageCount, page));

        // @todo: #2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(currentPage, pageCount, 5);
        pages.replaceChildren(
            ...visiblePages.map((pageNumber) => {
                const el = pageTemplate.cloneNode(true);
                return createPage(el, pageNumber, pageNumber === currentPage);
            })
        );

        // @todo: #2.5 — обновить статус пагинации
        fromRow.textContent = (currentPage - 1) * limit + 1;
        toRow.textContent = Math.min(currentPage * limit, total);
        totalRows.textContent = total;
    };

    return {applyPagination, updatePagination};
}