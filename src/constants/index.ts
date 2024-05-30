import { FilterOptions } from "@/types";

export const defaultFilterOptions: FilterOptions = {
  bedroomCountRange: {
    min: 1,
    max: 2,
  },
  listingType: "RENT",
  livingAreaRange: {
    min: 1000,
    max: 2000,
  },
  priceRange: { min: 25000, max: 35000 },
};

export const FETCH_LISTINGS_LIMIT = 20;
