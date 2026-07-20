import { isNvntAsset } from "@shared/lib";

import type { NvntAssetsViewProps } from "../NvntAssets/types";
import { NvntGridDropAsset } from "./Assets";

import s from "./nvntGridAssets.module.scss";

export const NvntGridAssets = ({
    assets,
    tab,
    getSellCount,
    setSellCount,
    setSellCountMax,
    sellOneAsset,
    selling,
}: NvntAssetsViewProps) => {
    return (
        <div className={s.grid}>
            {assets.map((asset) => {
                if (tab === "caseasset" && isNvntAsset(asset, "caseasset")) {
                    return (
                        <NvntGridDropAsset
                            key={asset.hash}
                            asset={asset}
                            sellCount={getSellCount(asset.hash)}
                            onSellCountChange={(value) => setSellCount(asset.hash, asset.count, value)}
                            onMax={() => setSellCountMax(asset.hash, asset.count)}
                            onSell={(count) => sellOneAsset({ hash: asset.hash, count })}
                            disabled={selling}
                        />
                    );
                }

                return null;
            })}
        </div>
    );
};
