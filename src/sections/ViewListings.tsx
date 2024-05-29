"use client";
import { PropertyFilters } from "@/components/inputs/PropertyFilters";
import { defaultFilterOptions } from "@/constants";
import { Listing, api } from "@/mocks/responses";
import { FilterOptions } from "@/types";
import { Flex } from "@radix-ui/themes";
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

  const { data, isLoading } = useQuery({
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
      m="6"
      direction={{ initial: "column", xs: "column", sm: "row" }}
      gap="4"
    >
      <PropertyFilters filterOptions={filterOptions} onSubmit={onSubmit} />
      {isLoading && "loading"}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </Flex>
  );
};
