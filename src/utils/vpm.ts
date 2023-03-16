import { Package, Repo } from "@/types/Repo";
import { fetchData } from "./request";

export async function getRepo() {
  return await fetchData<Repo>(
    "https://assets.vrchat.com/sdk/vrc-curated.json"
  );

  // https://assets.vrchat.com/sdk/vrc-curated.json
  // https://assets.vrchat.com/sdk/vrc-official.json
}

export async function getPackage(id: string) {
  return await (
    await getRepo()
  ).packages[id];
}

export function getlatestVersion(pack: Package) {
  const versions = Object.keys(pack.versions);
  if (versions.length == 0) return null;

  return pack.versions[versions.at(-1) as string];
}
