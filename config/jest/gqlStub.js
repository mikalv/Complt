module.exports = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "OperationDefinition",
            "operation": "query",
            "name": {
                "kind": "Name",
                "value": "Inbox"
            },
            "variableDefinitions": [],
            "directives": [],
            "selectionSet": {
                "kind": "SelectionSet",
                "selections": [
                    {
                        "kind": "Field",
                        "alias": null,
                        "name": {
                            "kind": "Name",
                            "value": "inbox"
                        },
                        "arguments": [],
                        "directives": [],
                        "selectionSet": {
                            "kind": "SelectionSet",
                            "selections": [
                                {
                                    "kind": "Field",
                                    "alias": null,
                                    "name": {
                                        "kind": "Name",
                                        "value": "id"
                                    },
                                    "arguments": [],
                                    "directives": [],
                                    "selectionSet": null
                                }, {
                                    "kind": "Field",
                                    "alias": null,
                                    "name": {
                                        "kind": "Name",
                                        "value": "name"
                                    },
                                    "arguments": [],
                                    "directives": [],
                                    "selectionSet": null
                                }, {
                                    "kind": "Field",
                                    "alias": null,
                                    "name": {
                                        "kind": "Name",
                                        "value": "isCompleted"
                                    },
                                    "arguments": [],
                                    "directives": [],
                                    "selectionSet": null
                                }, {
                                    "kind": "Field",
                                    "alias": null,
                                    "name": {
                                        "kind": "Name",
                                        "value": "tags"
                                    },
                                    "arguments": [],
                                    "directives": [],
                                    "selectionSet": null
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 71,
        "source": {
            "body": "query Inbox {\n  inbox {\n    id\n    name\n    isCompleted\n    tags\n  }\n}\n",
            "name": "GraphQL"
        }
    }
}
