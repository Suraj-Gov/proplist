/* eslint-disable @next/next/no-img-element */
import { Listing } from "@/mocks/responses";
import { toINR } from "@/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Text, Grid, Card, Inset, Box, Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const ListingsGrid = ({
  listings,
  children,
}: PropsWithChildren<{ listings: Listing[] }>) => {
  return (
    <Grid mx="auto" gap="6" columns={{ sm: "1", md: "2", lg: "3", xl: "4" }}>
      {listings.map((p) => (
        <Card key={p.id}>
          <Link href={`/listing/${p.id}`} target="_blank">
            <Inset clip="padding-box" side="top" pb="current">
              <img
                className="inset-card-image"
                src={p.images[0].url}
                alt={p.images[0].title}
                style={{ maxWidth: "20rem" }}
              />
            </Inset>
          </Link>
          <Box maxWidth={"18rem"}>
            <Text as="p" size="6" weight={"bold"}>
              {toINR(p.price)}
            </Text>
            <Text as="p" size="4">
              {p.bedroomCount}BHK &bull; {p.areaSqFt} sq.ft.
            </Text>
            <Text as="p" size="3" truncate>
              {p.title}
            </Text>
            <Text as="p" size="2" truncate>
              {p.description}
            </Text>
          </Box>
        </Card>
      ))}
      {children}
    </Grid>
  );
};
