const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()

    return (
        <div className="divide-y divide-neutral-500 overflow-hidden rounded-lg bg-neutral-700 shadow text-neutral-200">
            <div className="px-4 py-5">{date}</div>
            <div className="px-4 py-5">summary</div>
            <div className="px-4 py-4">mood</div>
        </div>
    )
}

export default EntryCard;