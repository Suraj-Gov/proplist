import { faker } from "@faker-js/faker";

const LISTING_COUNT = 10000;
export const INR_L = 100000;
export const INR_K = 1000;
export const PRICE_RANGE = {
  min: 14,
  max: 450,
};
export const BEDROOM_COUNT_RANGE = {
  min: 1,
  max: 7,
};
export const LIVING_AREA_RANGE = {
  min: 700,
  max: 6000,
};

type ListingImage = {
  url: string;
  title: string;
};
type ListingContact = {
  email: string;
  name: string;
};
export type ListingType = "RENT" | "SALE";
export type Listing = {
  id: number;
  name: string;
  type: ListingType;
  title: string;
  description: string;
  price: number;
  bedroomCount: number;
  areaSqFt: number;
  images: ListingImage[];
  contact: ListingContact;
  createdAt: Date;
};

const listings = new Map<number, Listing>();
const fromDate = new Date("2022-01-01").toISOString();
const todayDate = new Date().toISOString();

for (let i = 0; i < LISTING_COUNT; i++) {
  const listingType = Math.random() > 0.5 ? "SALE" : ("RENT" as const);
  const item: Listing = {
    id: i,
    name: faker.company.name(),
    type: listingType,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price:
      faker.number.int(PRICE_RANGE) * (listingType === "SALE" ? INR_L : INR_K),
    bedroomCount: faker.number.int(BEDROOM_COUNT_RANGE),
    areaSqFt: faker.number.int(LIVING_AREA_RANGE),
    images: [
      {
        url: faker.image.urlLoremFlickr({
          category: "building",
          height: 800,
          width: 1400,
        }),
        title: "Exterior",
      },
      {
        url: faker.image.urlLoremFlickr({
          category: "bedroom",
          height: 800,
          width: 800,
        }),
        title: "Bedroom",
      },
      {
        url: faker.image.urlLoremFlickr({
          category: "kitchen",
          height: 800,
          width: 800,
        }),
        title: "Kitchen",
      },
      {
        url: faker.image.urlLoremFlickr({
          category: "interiors",
          height: 800,
          width: 800,
        }),
        title: "Interiors",
      },
      {
        url: faker.image.urlLoremFlickr({
          category: "interiors",
          height: 800,
          width: 800,
        }),
        title: "Interiors",
      },
    ],
    contact: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
    createdAt: faker.date.between({ from: fromDate, to: todayDate }),
  };
  listings.set(i, item);
}

const delayRes = <T>(data: T): Promise<T> => {
  const delayMs = faker.number.int({ min: 300, max: 900 });
  return new Promise((res) => setTimeout(() => res(data), delayMs));
};

const get = {
  properties: (
    args: Partial<{
      listingType: ListingType;
      priceRange: {
        min: number;
        max: number;
      };
      bedroomCountRange: {
        min: number;
        max: number;
      };
      areaRange: {
        min: number;
        max: number;
      };
    }>,
    limit = 20,
    offset = 0
  ) => {
    let items = Array.from(listings.values());
    if (args.listingType) {
      items = items.filter((i) => i.type === args.listingType);
    }
    if (args.bedroomCountRange) {
      const { min, max } = args.bedroomCountRange;
      items = items.filter(
        (i) => i.bedroomCount >= min && i.bedroomCount <= max
      );
    }
    if (args.areaRange) {
      const { min, max } = args.areaRange;
      items = items.filter((i) => i.areaSqFt >= min && i.areaSqFt <= max);
    }
    if (args.priceRange) {
      const { min, max } = args.priceRange;
      items = items.filter((i) => i.price >= min && i.price <= max);
    }
    const slice = items.splice(offset, limit);
    return delayRes(slice);
  },
  property: (id: number) => {
    const item = listings.get(id);
    return delayRes(item);
  },
};

export const api = {
  get,
};
