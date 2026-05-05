import gamesOn from '@shared/assets/icons/svg/games_on.svg?react';
import gamesOff from '@shared/assets/icons/svg/games_off.svg?react';

import invOn from '@shared/assets/icons/svg/inv_on.svg?react';
import invOff from '@shared/assets/icons/svg/inv_off.svg?react';

import meOn from '@shared/assets/icons/svg/me_on.svg?react';
import meOff from '@shared/assets/icons/svg/me_off.svg?react';

import storeOn from '@shared/assets/icons/svg/store_on.svg?react';
import storeOff from '@shared/assets/icons/svg/store_off.svg?react';

import eyeOn from '@shared/assets/icons/svg/eye_on.svg?react';
import eyeOff from '@shared/assets/icons/svg/eye_off.svg?react';

import selectOn from "@shared/assets/icons/svg/select_on.svg?react";
import selectOff from "@shared/assets/icons/svg/select_off.svg?react";

import filter from "@shared/assets/icons/svg/filter.svg?react";
import search from "@shared/assets/icons/svg/search.svg?react";
import arrow from "@shared/assets/icons/svg/arrow.svg?react";
import minSelect from "@shared/assets/icons/svg/minSelect.svg?react";
import decSelect from "@shared/assets/icons/svg/decSelect.svg?react";
import incSelect from "@shared/assets/icons/svg/incSelect.svg?react";
import maxSelect from "@shared/assets/icons/svg/maxSelect.svg?react";

const ICON_LIST = {
    games_on: gamesOn,
    games_off: gamesOff,

    inv_on: invOn,
    inv_off: invOff,

    me_on: meOn,
    me_off: meOff,

    store_on: storeOn,
    store_off: storeOff,

    eye_on: eyeOn,
    eye_off: eyeOff,

    selectOn: selectOn,
    selectOff: selectOff,

    filter: filter,
    search: search,
    arrow: arrow,
    
    minSelect: minSelect,
    decSelect: decSelect,
    incSelect: incSelect,
    maxSelect: maxSelect
} as const;

export type IconName = keyof typeof ICON_LIST;

interface IconProps {
    name: IconName;
    className?: string;
    size?: number;
}

export const Icon = ({ name, className, size = 24 }: IconProps) => {
    const SVGIcon = ICON_LIST[name];
    if (!SVGIcon) return null;
    return (
        <SVGIcon
            className={className}
            width={size}
            height={size}
            style={{ flexShrink: 0 }}
        />
    );
};