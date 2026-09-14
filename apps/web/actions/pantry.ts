export type PantryItem = {
  name: string;
  quantity: number;
  purchaseFrequency: number;
};

export type StockStatus = "LOW STOCK" | "OK";

export function getStockStatus(item: PantryItem): StockStatus {
  // Purchase frequency represents the usual quantity bought.
  const threshold = Math.max(1, Math.ceil(item.purchaseFrequency * 0.25));

  return item.quantity <= threshold ? "LOW STOCK" : "OK";
}

export function getLowStockItems(items: PantryItem[]): PantryItem[] {
  return items.filter((item) => getStockStatus(item) === "LOW STOCK");
}