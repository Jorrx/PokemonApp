export const usePogination = (lengthOfArray, limit) => {
    const pages = [];
    const pagesCount = Math.ceil(lengthOfArray / limit);

    for (let i = 1; i <= pagesCount; i++) {
        pages[i - 1] = i;
    }
    console.log(lengthOfArray, limit )
    return pages;
};

export const useGetPages = (pages, page) => {
    const viewPages = pages.length > 7 ? 7 : pages.length;
    const checker = Math.floor(viewPages / 2);
    const startItem =
        page - checker > 0 && page < pages.length - checker
            ? page - checker
            : page >= pages.length - checker
            ? pages.length - viewPages + 1
            : 1;
    console.log(startItem);
    const endItem =
        page + checker < 7
            ? 7
            : page + checker >= pages.length
            ? pages.length
            : page + checker;

    return [...pages.slice(startItem - 1, endItem)];
};
