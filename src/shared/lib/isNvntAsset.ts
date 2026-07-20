import type { AllowedNvntModelNames, NvntAssetOf, NvntBaseAssetInterface } from "@shared/types";

export function isNvntAsset<K extends AllowedNvntModelNames>(asset: NvntBaseAssetInterface, type: K): asset is NvntAssetOf<K> {
    return asset.content_type === type;
}