import { GlobeIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

const SiteFooter = () => {
  return (
    <footer className="mb-4 container">
      <Separator orientation="horizontal" className="mb-4" />
      <div className="mx-auto items-center justify-between md:flex">
        <div className="inline-flex items-center cursor-pointer">
          <GlobeIcon className="size-6 text-primary" />
          <span className="ml-2 text-lg font-bold">RedPlanetQuest</span>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-foreground">
            © 2024 RedPlanetQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
