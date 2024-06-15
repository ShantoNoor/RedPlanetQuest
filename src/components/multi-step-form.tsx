import { Meteors } from "./ui/meteors";

export function MultiStepForm() {
  return <section id="form" className="container relative h-[40rem]  bg-gray-400">

    <Meteors number={15} />
  </section>;
}
