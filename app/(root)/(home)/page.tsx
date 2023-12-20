import { getPlatform } from "@/lib/services/Api";

export default async function Home() {

  await getPlatform()

  return <div>hello</div>;
}
