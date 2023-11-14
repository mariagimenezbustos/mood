import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const links = [
    {href: "/", label: "Home"},
    {href: "/journal", label: "Journal"},
    {href: "/history", label: "History"},
]

const DashboardLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen relative bg-neutral-800">
            <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-neutral-600">
                <div className="px-4 my-4">
                    <span className="text-3xl font-bold text-neutral-200">MOOD</span>
                </div>
                <ul className="px-4">
                    {links.map((link) =>
                        <li key={link.href} className="my-4 text-xl text-neutral-200">
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    )}
                </ul>
            </aside>
            <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
                <header className="h-[60px] border-b border-neutral-600">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    )
}

export default DashboardLayout