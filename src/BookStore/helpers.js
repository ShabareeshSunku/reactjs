function parseBook(ithItem) {
    let thumbnail = ''
    const {
        volumeInfo = {},
        saleInfo = {},
        accessInfo = {},
        id = ''
    } = ithItem
    const authors = volumeInfo.authors || []
    const types = []
    if (accessInfo && accessInfo.epub && accessInfo.epub.isAvailable) {
        types.push('epub')
    }
    if (accessInfo && accessInfo.pdf && accessInfo.pdf.isAvailable) {
        types.push('pdf')
    }
    if (ithItem.volumeInfo.imageLinks) {
        thumbnail = `https://books.google.com/books/content/images/frontcover/${id}?fife=w400-h600`
    }
    return {
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle || volumeInfo.description || '',
        description : volumeInfo.description || '',
        thumbnail: thumbnail,
        price: saleInfo && saleInfo.retailPrice && saleInfo.retailPrice.amount,
        buyLink: saleInfo && saleInfo.buyLink,
        id: id,
        rating: volumeInfo.averageRating || 0,
        authors: authors || [],
        types,
        embeddable: accessInfo.embeddable
    }
}

function parseBooks(bookData, filters = { authors: [], publishers: [], categories: [] }) {
    let books = []
    let items = (bookData && bookData.items && bookData.items) || []
    let itemLen = items.length
    let parsedFilters = filters
    if (itemLen) {
        for (let i = 0; i < itemLen; i++) {
            let ithItem = items[i]
            const {
                volumeInfo = {}
            } = ithItem
            const authors = volumeInfo.authors || []
            const categories = volumeInfo.categories || []
            const publisher = volumeInfo.publisher || ''
            const parsedItem = parseBook(ithItem)
            if (Object.keys(parsedItem).length > 0) {
                books.push(parsedItem)
            }
            parseFilters(parsedFilters, authors, categories, publisher)

        }
    }
    return {
        books,
        filters: {
            authors: parsedFilters.authors.sort(),
            publishers: parsedFilters.publishers.sort(),
            categories: parsedFilters.categories.sort()
        }

    }
}

function parseFilters(filters, authors = [], categories = [], publisher = '') {
    authors.forEach(function (author) {
        author = author.toLowerCase()
        if (author && filters.authors.indexOf(author) === -1) {
            filters.authors.push(author)
        }
    })
    categories.forEach(function (category) {
        category = category.toLowerCase()
        if (category && filters.categories.indexOf(category) === -1) {
            filters.categories.push(category)
        }
    })
    publisher = publisher.toLowerCase()
    if (publisher && filters.publishers.indexOf(publisher) === -1) {
        filters.publishers.push(publisher)
    }
}

function parseSearch(queryString) {
    var match, re, ret;
    re = /\??(.*?)=([^\&]*)&?/gi;
    ret = {};
    while (match = re.exec(queryString)) {
        ret[match[1]] = match[2];
    }
    return ret;
}
export {
    parseBooks,
    parseSearch,
    parseBook
}