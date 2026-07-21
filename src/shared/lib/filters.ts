import { NvntBaseAssetInterface, NvntFilters } from '@shared/types';

export function hasNvntActiveFilters(filters: NvntFilters): boolean {
    return (
        filters.search.trim().length > 0
        || filters.tradeLocked !== "all"
        || filters.saleable !== "all"
        || filters.stackable !== "all"
    );
}

export function filterAndSortAssets(
    assets: NvntBaseAssetInterface[],
    filters: NvntFilters
): NvntBaseAssetInterface[] {
    if (!assets || assets.length === 0) return [];

    let result = [...assets];

    // 1. searhc
    const searchQuery = filters.search.trim();
    if (searchQuery.length > 0) {
        result = result.filter(asset => asset.item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // 2. tradeLocked
    if (filters.tradeLocked !== 'all') {
        const targetValue = filters.tradeLocked === 'yes';
        result = result.filter(asset => asset.trade_locked === targetValue);
    }

    // 3. saleable
    if (filters.saleable !== 'all') {
        const targetValue = filters.saleable === 'yes';
        result = result.filter(asset => asset.saleable === targetValue);
    }

    // 4. stackable
    if (filters.stackable !== 'all') {
        const targetValue = filters.stackable === 'yes';
        result = result.filter(asset => asset.stackable === targetValue);
    }

    // 4. sorting
    result.sort((a, b) => {
        switch (filters.sortBy) {
            case 'date_desc':
                return new Date(b.obtained_at).getTime() - new Date(a.obtained_at).getTime();
            case 'date_asc':
                return new Date(a.obtained_at).getTime() - new Date(b.obtained_at).getTime();
            case 'price_desc': {
                const priceA = a.price ? parseFloat(a.price) : 0;
                const priceB = b.price ? parseFloat(b.price) : 0;
                return priceB - priceA;
            }
            case 'price_asc': {
                const priceA = a.price ? parseFloat(a.price) : 0;
                const priceB = b.price ? parseFloat(b.price) : 0;
                return priceA - priceB;
            }
            default:
                return 0;
        }
    });

    return result;
}
