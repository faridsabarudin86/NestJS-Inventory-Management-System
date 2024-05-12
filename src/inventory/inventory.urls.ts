export enum InventoryUrls {
  getAllInventoryInCorporate = '/:corporateUuid',
  getAllInventory = '/',
  getInventory = '/:corporateUuid/:inventoryUuid',
  addInventory = '/:corporateUuid',
  editInventory = '/:corporateUuid/:inventoryUuid',
  quickEditInventoryQuantity = '/:corporateUuid/:inventoryUuid/:quantityType',
  deleteInventory = '/:corporateUuid/:inventoryUuid',
}
