import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-base sm:text-lg md:text-xl">
      <ul className="flex flex-wrap gap-6 sm:gap-10 md:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-4"
          >
            {session?.user?.image && (
              <img
                className="h-6 sm:h-7 md:h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                referrerPolicy="no-referrer"
              />
            )}
            <span>Guest area</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
