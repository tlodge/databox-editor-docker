#!/usr/bin/env mongo
var db = new Mongo().getDB("datashop");
db.apps.remove({});
