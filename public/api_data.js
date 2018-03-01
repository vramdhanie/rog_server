define({ "api": [  {    "type": "post",    "url": "/auth/",    "title": "Login the user",    "name": "login",    "group": "Auth",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Unique username to identify this user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "passsword",            "description": ""          }        ]      }    },    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "Object",            "optional": false,            "field": "Token",            "description": "<p>The JWT</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n  {\n    \"token\": JWT_TOKEN\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "auth/router.js",    "groupTitle": "Auth"  },  {    "type": "post",    "url": "/refresh/",    "title": "Refresh the authentication token",    "name": "refresh",    "group": "Auth",    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "Object",            "optional": false,            "field": "Token",            "description": "<p>The JWT</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n  {\n    \"token\": JWT_TOKEN\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "auth/router.js",    "groupTitle": "Auth"  },  {    "type": "post",    "url": "/document/",    "title": "Create a new document",    "name": "createDocuments",    "group": "Document",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>Title of new document</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>Long description of document</p>"          }        ]      }    },    "success": {      "fields": {        "201": [          {            "group": "201",            "type": "Object",            "optional": false,            "field": "Document",            "description": "<p>The created document</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n  {\n    \"_id\": ObjectId\n    \"title\": String,\n    \"description\": String\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "documents/router.js",    "groupTitle": "Document"  },  {    "type": "get",    "url": "/document/",    "title": "Request all documents",    "name": "getDocuments",    "group": "Document",    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "Object[]",            "optional": false,            "field": "documents",            "description": "<p>List of documents</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n[\n  {\n    \"title\": String,\n    \"description: String\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "documents/router.js",    "groupTitle": "Document"  },  {    "type": "get",    "url": "/institution/",    "title": "Request all institutions",    "name": "getInstitutions",    "group": "Institution",    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "Object[]",            "optional": false,            "field": "institutions",            "description": "<p>List of institutions</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n[\n  {\n    \"name\": String,\n    \"documents: [Document]\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "institutions/router.js",    "groupTitle": "Institution"  },  {    "type": "post",    "url": "/user/",    "title": "Create a new user",    "name": "createUsers",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Unique username to identify this user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "firstName",            "description": "<p>First name of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "lastName",            "description": "<p>Last name of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email address of the user</p>"          }        ]      }    },    "success": {      "fields": {        "201": [          {            "group": "201",            "type": "Object",            "optional": false,            "field": "User",            "description": "<p>The created user object</p>"          }        ]      },      "examples": [        {          "title": "Success-response:",          "content": "\nHTTP/1.1 200 OK\n  {\n    \"_id\": ObjectId\n    \"username\": String,\n    \"name\": String\n  }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "VaidationError",            "description": "<p>A field is invalid or missing</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 422 Unprocessable Entity\n{\n   code: 422,\n   reason: 'ValidationError',\n   message: 'Missing parameter',\n   location: String\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "users/router.js",    "groupTitle": "User"  }] });
