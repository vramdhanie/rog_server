'use strict';
const { Document } = require('./documents');


class Parser {
  constructor(document){
    this.raw_document = document;
    this.document = new Document();
  }

  parse(){
    return this.document;
  }

}

module.exports = Parser;
