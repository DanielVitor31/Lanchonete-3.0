// cachedFoods.ts
import { unstable_cache } from "next/cache";
import getFoodsGrouped from "./getFoodsGrouped";

export const getFoodsFullCached = unstable_cache(
    async () => getFoodsGrouped(),
    ["foods-full"],
    { revalidate: 120 }
);
