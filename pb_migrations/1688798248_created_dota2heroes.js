migrate((db) => {
  const collection = new Collection({
    "id": "wvsqs3l236b8pff",
    "created": "2023-07-08 06:37:28.680Z",
    "updated": "2023-07-08 06:37:28.680Z",
    "name": "dota2heroes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s7j43kq9",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wvsqs3l236b8pff");

  return dao.deleteCollection(collection);
})
