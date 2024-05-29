/* eslint-disable @next/next/no-img-element */
import { api } from "@/mocks/responses";
import { toINR } from "@/utils";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Callout,
  Card,
  Container,
  Flex,
  Inset,
  ScrollArea,
  Text,
} from "@radix-ui/themes";

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const notFound = (
    <Callout.Root>
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>Listing not found</Callout.Text>
    </Callout.Root>
  );

  if (isNaN(id)) {
    return notFound;
  }

  const listing = await api.get.property(id);

  if (!listing) {
    return notFound;
  }

  return (
    <Container size="3">
      <Box mb="4">
        <Text size="8" weight={"bold"}>
          {toINR(listing.price)}
        </Text>
        <Text as="p" size="4">
          <Text weight={"bold"}>
            {listing.type === "RENT" ? "Rent" : "Sale"}
          </Text>{" "}
          &bull; {listing.bedroomCount}BHK &bull; {listing.areaSqFt} sq.ft.
        </Text>
      </Box>

      <Flex
        gap="6"
        position={"relative"}
        overflow={"scroll"}
        style={{ scrollSnapType: "x" }}
      >
        {listing.images.map((i) => (
          <Box
            flexShrink={"0"}
            style={{ scrollSnapAlign: "start" }}
            width={"25rem"}
            key={i.url}
          >
            <Card>
              <Inset clip={"padding-box"}>
                <img src={i.url} alt={i.title} />
              </Inset>
            </Card>
            <Box mt="2" mb="4">
              <Text>{i.title}</Text>
            </Box>
          </Box>
        ))}
      </Flex>
      <Text size={"4"} as="p">
        {listing.title}
      </Text>
      <Text style={{ opacity: 0.6 }} as="p">
        {listing.description}
      </Text>
      <Text as="p" mt="4">
        Posted by {listing.contact.name}
      </Text>
      <Text style={{ opacity: 0.6 }} as="p">
        {listing.contact.email}
      </Text>
    </Container>
  );
}
