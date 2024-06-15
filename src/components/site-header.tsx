import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GlobeIcon className="size-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              RedPlanetQuest
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Badge className="text-sm py-[6px]">
              <Link
                href="#form"
                className={cn("transition-colors hover:text-foreground/80")}
              >
                Apply Now
              </Link>
            </Badge>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="https://github.com/ShantoNoor/red-planet-quest"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <GitHubLogoIcon className="size-5 fill-current" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/shantonoor/"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <LinkedInLogoIcon className="size-5 fill-current" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
