migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wvsqs3l236b8pff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2y8sae7p",
    "name": "primary_attr",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z5mmhqd4",
    "name": "complexity",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4pvzkgwf",
    "name": "image",
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
  collection.schema.removeField("2y8sae7p")

  // remove
  collection.schema.removeField("z5mmhqd4")

  // remove
  collection.schema.removeField("4pvzkgwf")

  return dao.saveCollection(collection)
})
