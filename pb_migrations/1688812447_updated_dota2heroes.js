migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvsqs3l236b8pff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gmaihcix",
    "name": "name_loc",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvsqs3l236b8pff")

  // remove
  collection.schema.removeField("gmaihcix")

  return dao.saveCollection(collection)
})
