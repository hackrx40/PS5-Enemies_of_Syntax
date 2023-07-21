export const categoriesColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "number_of_products",
    header: "Number of Products",
  },
];

export const auctionTypes = [
  {
    type_id: 1,
    type: "Normal",
  },
  {
    type_id: 2,
    type: "Event",
  }
]

export const auctionStatuses = [
  {
    status_id: 1,
    status: "Upcoming",
  },
  {
    status_id: 2,
    status: "Live",
  },
  {
    status_id: 3,
    status: "Completed"
  }
]

export const categories = [
  {
    category_id: 1,
    name: "Electronics",
    number_of_products: 16724,
  },
  {
    category_id: 2,
    name: "Vehicles",
    number_of_products: 533,
  },
  {
    category_id: 3,
    name: "Real estate",
    number_of_products: 363,
  },
  {
    category_id: 4,
    name: "Art piece",
    number_of_products: 2355,
  },
  {
    category_id: 5,
    name: "Jewelry",
    number_of_products: 8563,
  },
  {
    category_id: 6,
    name: "Construction",
    number_of_products: 235,
  }
];
