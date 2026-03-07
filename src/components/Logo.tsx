"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo() {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex items-center pointer-events-none">
            <Link
                href="/"
                onClick={handleClick}
                className="w-10 h-10 md:w-16 md:h-16 relative flex items-center justify-center pointer-events-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mix-blend-screen cursor-pointer"
            >
                <Image src="/logo.jpg" alt="Vizhi Logo" fill className="object-contain" priority />
            </Link>
        </nav>
    );
}
