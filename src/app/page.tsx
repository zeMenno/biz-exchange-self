
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <h1>HALLO</h1>
    </HydrateClient>
  );
}
