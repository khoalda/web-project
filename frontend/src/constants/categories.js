export const Categories = [
  { key: "1", name: "Beverages", value: "Thức uống" },
  { key: "2", name: "Potato", value: "Khoai tây" },
  { key: "3", name: "Chicken", value: "Gà" },
  { key: "4", name: "Burgers", value: "Hambuger" },
  { key: "5", name: "Salads", value: "Salad" },
];

export const categoryMapper = (category) => {
  const found = Categories.find((item) => item.name === category);
  return found ? found.value : "";
};

export const categoryKeyMapper = (category) => {
  const found = Categories.find((item) => item.name === category);
  return found ? found.key : "";
};
