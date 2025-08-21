import Link from "next/link";

export default function Badges({
  strings,
  className,
}: {
  strings: string[];
  className?: string;
}) {
  return (
    <ul className="flex gap-1 flex-wrap">
      {strings.map((tag, i) => (
        <Link href={`/pages/search/${tag}`} key={i}>
          <li className={`text-sm px-2 py-0.5 ${className}`} key={i}>
            {tag}
          </li>
        </Link>
      ))}
    </ul>
  );
}
