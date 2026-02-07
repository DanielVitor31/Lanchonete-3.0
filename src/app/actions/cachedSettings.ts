// cachedFoods.ts
import { unstable_cache } from "next/cache";
import { getSettingsColors, getSettings } from "./getSettings"
export const getSettingsCached = unstable_cache(
    async () => getSettings(),
    ["settings"],
    { revalidate: 120 }
);


export const getSettingsColorsCached = unstable_cache(
    async () => getSettingsColors(),
    ["settings-collors"],
    { revalidate: 900 }
);
