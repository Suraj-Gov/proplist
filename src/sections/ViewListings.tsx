"use client";
import { ListingsGrid } from "@/components/ListingsGrid";
import { PropertyFilters } from "@/components/inputs/PropertyFilters";
import { FETCH_LISTINGS_LIMIT, defaultFilterOptions } from "@/constants";
import { Listing, api } from "@/mocks/responses";
import { FilterOptions } from "@/types";
import { toINR } from "@/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Inset,
  Spinner,
  Text,
} from "@radix-ui/themes";
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

  const [pagination, setPagination] = useState({
    limit: FETCH_LISTINGS_LIMIT,
    offset: 0,
  });

  const fetchPrev = () =>
    setPagination((p) => ({ ...p, offset: p.offset - p.limit }));
  const fetchNext = () =>
    setPagination((p) => ({ ...p, offset: p.offset + p.limit }));

  const { data: listings, isLoading } = useQuery({
    queryKey: ["listings", filterOptions, pagination],
    queryFn: () =>
      api.get.properties(filterOptions, pagination.limit, pagination.offset),
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
        top={{ initial: "0", sm: "6" }}
        pt={{ initial: "6", sm: "0" }}
        style={{ zIndex: 10, background: "var(--color-background)" }}
      >
        <PropertyFilters filterOptions={filterOptions} onSubmit={onSubmit} />
      </Box>
      {isLoading && (
        <Flex justify={"center"}>
          <Spinner size="3" />
        </Flex>
      )}
      {listings && (
        <ListingsGrid listings={listings}>
          <Flex gap="4" justify={"center"} align={"center"}>
            <Button disabled={pagination.offset === 0} onClick={fetchPrev}>
              <ArrowLeftIcon />
              Previous
            </Button>
            <Button
              disabled={listings.length < pagination.limit}
              onClick={fetchNext}
            >
              <ArrowRightIcon />
              Next
            </Button>
          </Flex>
        </ListingsGrid>
      )}
    </Flex>
  );
};
