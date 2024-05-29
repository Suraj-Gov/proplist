import { PropertyFilters } from "@/components/inputs/PropertyFilters";
import { BEDROOM_COUNT_RANGE, Listing, api } from "@/mocks/responses";
import { ViewListings } from "@/sections/ViewListings";
import { FilterOptions } from "@/types";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string /** FilterOptions */;
  };
}) {
  let listings: Listing[] | null = null;
  let filterOptions: FilterOptions | null = null;
  if (searchParams.filter) {
    filterOptions = JSON.parse(searchParams.filter) as FilterOptions;
    listings = await api.get.properties(filterOptions);
  }

  return (
    <ViewListings initFilterOptions={filterOptions} initListings={listings} />
  );
}
