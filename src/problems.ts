interface Item<T> {
  inventory: T;
  price: T;
  salePrice: T;
  saleInventory: T;
}

export default function getLowestPrice({
  inventory,
  price,
  saleInventory,
  salePrice,
}: Item<number>) {
  // 재고 없으면 0 반환
  if (!inventory) return 0;

  //item이 할인 중 & 할인재고 있음 할인 가격 반환

  if (salePrice && saleInventory) {
    return salePrice;
  }

  return price;
  // 할인 중 아니거나 || 할인 중이여도 할인재고 없으면 정상가격 반환
}

function addClick(items: any[]) {
  for (let i = 0; i < items.length; i++) {
    items[i].onClick = () => i;
  }

  return items;
}

const example = [{}, {}];
const clickSet = addClick(example);
console.log(clickSet[1].onClick());
