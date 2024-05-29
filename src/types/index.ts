import {
  ListingType,
  PRICE_RANGE,
  BEDROOM_COUNT_RANGE,
  LIVING_AREA_RANGE,
} from "@/mocks/responses";

export type FilterOptions = {
  listingType: ListingType;
  priceRange: typeof PRICE_RANGE;
  bedroomCountRange: typeof BEDROOM_COUNT_RANGE;
  livingAreaRange: typeof LIVING_AREA_RANGE;
};
