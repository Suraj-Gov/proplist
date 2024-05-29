"use client";
import { ListingsGrid } from "@/components/ListingsGrid";
import { PropertyFilters } from "@/components/inputs/PropertyFilters";
import { defaultFilterOptions } from "@/constants";
import { Listing, api } from "@/mocks/responses";
import { FilterOptions } from "@/types";
import { toINR } from "@/utils";
import { Box, Card, Flex, Grid, Inset, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ViewListings = (props: {
  initFilterOptions?: FilterOptions | null;
  initListings: Listing[] | null;
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    props.initFilterOptions ?? defaultFilterOptions
  );

  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings", filterOptions],
    queryFn: () => api.get.properties(filterOptions),
    initialData: props.initListings,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = (options: FilterOptions) => {
    setFilterOptions(options);
    const qs = new URLSearchParams(searchParams.toString());
    qs.set("filter", JSON.stringify(options));
    router.push(pathname + "?" + qs.toString());
  };

  return (
    <Flex
      direction={{ initial: "column", xs: "column", sm: "row" }}
      gap="4"
      position={"relative"}
      align={"start"}
    >
      <Box
        width={{ initial: "100%", xs: "100%", sm: "40vw", md: "20vw" }}
        position={"sticky"}
        top="0"
        py={{ initial: "6", sm: "0" }}
        style={{ zIndex: 10, background: "var(--color-background)" }}
      >
        <PropertyFilters filterOptions={filterOptions} onSubmit={onSubmit} />
      </Box>
      {isLoading && (
        <Flex justify={"center"}>
          <Spinner size="3" />
        </Flex>
      )}
      {listings && <ListingsGrid listings={listings} />}
    </Flex>
  );
};
