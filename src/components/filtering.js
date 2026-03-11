export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map((name) => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement?.querySelector('input');
            if (input) {
                input.value = '';
            }
            state[field] = '';
        }

        const filter = {};
        Object.keys(elements).forEach((key) => {
            const el = elements[key];
            if (!el) return;
            if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName) && el.value) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}