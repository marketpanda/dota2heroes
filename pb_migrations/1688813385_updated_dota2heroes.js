migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvsqs3l236b8pff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g2evtndn",
    "name": "attribute_img",
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
  collection.schema.removeField("g2evtndn")

  return dao.saveCollection(collection)
})
