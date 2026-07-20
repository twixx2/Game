import { isNvntAsset } from "@shared/lib";

import type { NvntAssetsViewProps } from "../NvntAssets/types";
import { NvntRowsDropAsset } from "./Assets";

import s from "./nvntRowsAssets.module.scss";

export const NvntRowsAssets = ({
    assets,
    tab,
    getSellCount,
    setSellCount,
    setSellCountMax,
    sellOneAsset,
    selling,
}: NvntAssetsViewProps) => {
    return (
        <div className={s.rows}>
            {assets.map((asset) => {
                if (tab === "caseasset" && isNvntAsset(asset, "caseasset")) {
                    return (
                        <NvntRowsDropAsset
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
