'use client'; // Pastikan ini ada untuk penggunaan di Next.js

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Gunakan next/navigation untuk navigasi
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function HomePage() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Buat</span>
        <span className={title({ color: "green" })}>Disini</span>
        <br />
        <span className={title()}>
          Untuk
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Homepage/Dashboard
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
