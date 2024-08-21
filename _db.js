const books = [
    {ID:1, name: "surya dharma2", release: 2001, authors_id:1 },
    {ID:2, name: "The Awakening2", release: 1899, authors_id:2 },
    {ID:3, name: "City of Glas2s", release: 1994, authors_id:3 },
    {ID:4, name: "The Great Gatsb2y", release: 1925, authors_id:4 }
]

const authors = [
    {ID:1,name: "surya dharma"},
    {ID:2,name: "The Awakenings"},
    {ID:3,name: "City of Glass"},
    {ID:4,name: "The Great Gatsby"},
    {ID:5,name: "F. Scott Fitzgerald"}
]

const lending = [
    {
        ID:1,
        book_id: 1,
        user_id:1
    },
    {
        ID:2,
        book_id: 3,
        user_id:2
    },
    {
        ID:3,
        book_id: 3,
        user_id:1
    }
]

export {books,authors,lending}