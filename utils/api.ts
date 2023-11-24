const createURL = (path) => {
    return window.location.origin + path
}

export const updateEntry = async (id, updates) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: "PATCH",
        body: JSON.stringify({ updates }),
    }))

    if (res.ok) return res.json()
    else throw new Error("Something went wrong on API server updating the entry!")
}

export const deleteEntry = async (id) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: "DELETE",
    }))

    if (res.ok) return res.json()
    else throw new Error("Something went wrong on API server deleting the entry!")
}

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL("/api/journal"), {
            method: "POST",
            body: JSON.stringify({ content: "new entry" }),
        })
    )

    if (res.ok) return res.json()
    else throw new Error("Something went wrong on API server creating a new entry!")
}


// -------------------


// export const createNewEntry = async () => {
//     const res = await fetch(
//         new Request(createURL('/api/journal'), {
//             method: 'POST',
//             body: JSON.stringify({ content: 'new entry' }),
//         })
//     )

//     if (res.ok) {
//         return res.json()
//     } else {
//         throw new Error('Something went wrong on API server!')
//     }
// }

// export const updateEntry = async (id, updates) => {
//     const res = await fetch(
//         new Request(createURL(`/api/entry/${id}`), {
//             method: 'PATCH',
//             body: JSON.stringify({ updates }),
//         })
//     )

//     if (res.ok) {
//         return res.json()
//     } else {
//         throw new Error('Something went wrong on API server!')
//     }
// }


// -------------------


export const askQuestion = async (question) => {
    const res = await fetch(
        new Request(createURL(`/api/question`), {
            method: 'POST',
            body: JSON.stringify({ question }),
        })
    )

    if (res.ok) return res.json()
    else throw new Error("Something went wrong on API server asking a question!")
}

// export const fetcher = (...args) => fetch(...args).then(res => res.json())