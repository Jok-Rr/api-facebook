# My Social Networks API 🌐🎉

Welcome to the My Social Networks api, it is thanks to this api that the Facebook services you use will work perfectly. Follow the documentation below and everything will be in order.

## Dependency uses ⚒️

- [body-parser](https://www.npmjs.com/package/body-parser)
- [crypto](https://www.npmjs.com/package/crypto-js)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

## Requirement ✅

- NodeJS
- MongoDB
- MongoDB Compass (If you want to be faster)
- Postman (Use for test)
- Ubuntu (Windows Users)

## Installation 🏗️
To install and set up the development environment, run this command in your terminal :

```nmp i```

After the installation is complete, we will need to configure the path for mongoDB to work properly. 
Go to the ```config.js``` file at the root of your project. 
And fill in your own url that corresponds to your mongoDB. 



```javascript
const config = {

  development: {
    port: 3000,
    mongodb: 'mongodb://localhost:2717/mongodb-api'
  },
  production: {
    port: 3000,
    mongodb: 'mongodb://localhost:2717/mongodb-api'
  }
  
}

export default config;
```

After that we can start. I will then introduce you to all the features

# Features ✨

The following parts are dedicated to the explanation of the use of the api

### - [Group](#group-collection-group)

### - [Event](#event-collection-event)

### - [User](#user-collection-user)

### - [Thread](#thread-collection-thread)

### - [Survey](#survey-collection-survey)

### - [Gallery](#gallery-collection-gallery)

### - [Ticketing](#ticketing-collection-ticketing)

## Group collection [/group]

In the group party you will be able to : Create, read, update and delete groups (CRUD)

## Data structures

### Group
[Back to feature](#features-)

+ id: (string, required)
+ name: (string, required)
+ description: (string, required)
+ icon: (String, required)
+ imageCover: (String, required)
+ type: (String, required)
+ publishAllow: (Boolean, required)
+ createEventAllow: (Boolean, required)
+ members: (Array)
  + id: (string, required)
  + role (string, required)

### Create Movies [POST]

```
http://yourhost.fr/group/create
````
Body exemples
```json
{
    "groupName": "801",
    "descripton": "Un groupe pour sortir en boite",
    "icon": "https://monimagedegroup.fr/img-icon45",
    "imageCover": "https://monimagedegroup.fr/img45",
    "type": "secret",
    "publishAllow": 1,
    "createEventAllow": 1,
    "members": [
        {
            "_id": "629679f09cf65702123f36cf",
            "role": "admin"
        },
        {
            "_id": "6290a3df4ff48a9ddcd131a0",
            "role": "member"
        }
    ]
}
```

### Read Group [GET]

```
http://yourhost.fr/group/view/:idGroup
````
Response exemples
```json
{
    "groupName": "801",
    "descripton": "Un groupe pour sortir en boite",
    "icon": "https://monimagedegroup.fr/img-icon45",
    "imageCover": "https://monimagedegroup.fr/img45",
    "type": "secret",
    "publishAllow": true,
    "createEventAllow": true,
    "members": [
        {
            "_id": "629679f09cf65702123f36cf",
            "role": "admin"
        },
        {
            "_id": "6290a3df4ff48a9ddcd131a0",
            "role": "member"
        }
    ],
    "id": "629af743dbfdce289a4f8980"
}
```

### Update Group [PUT]

```
http://yourhost.fr/group/update/:idGroup
````
Body exemples
```json
{
    "groupName": "801",
    "descripton": "Un groupe pour sortir en boite",
    "icon": "https://monimagedegroup.fr/img-icon45",
    "imageCover": "https://monimagedegroup.fr/img45",
    "type": "secret",
    "publishAllow": 1,
    "createEventAllow": 1
}
```


### Add member Group [POST]

```
http://yourhost.fr/group/:idGroup/member/add
````
Body exemples
```json
{
    "members": [
        {
            "_id": "6290c4b481438f6574e71ce0",
            "role": "member"
        },
        {
            "_id": "6290a68b4ff48a9ddcd131a7",
            "role": "admin"
        }
    ]
}
```
### Delete Group [DELETE]

```
http://yourhost.fr/group/delete/:idGroup
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```

## Event collection [/event]
[Back to feature](#features-)

In the event collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### Event

+ id: (string, required)
+ name: (string, required)
+ description: (string, required)
+ startdate (Date, required)
+ enddate (Date, required)
+ places: (String, required)
+ imageCover: (String, required)
+ private: (Boolean, required)
+ members: (Array)
  + id: (string, required)
  + role (string, required)

### Create Event [POST]

```
http://yourhost.fr/event/create
````
Body exemples
```json
{
    "eventName": "La soirée de l'anneé",
    "descripton": "Une soirée a ne pas manquer ",
    "startDate": "2022-05-12",
    "endDate": "2022-05-14",
    "places": "Paris",
    "imageCover": "https://monimagedegroup.fr/img-icon45",
    "private": 0,
    "members": [
        {
            "_id": "629679f09cf65702123f36cf",
            "role": "admin"
        },
        {
            "_id": "6290a3df4ff48a9ddcd131a0",
            "role": "member"
        }
    ]
}
```

### Read Event [GET]

```
http://yourhost.fr/event/view/:idEvent
````
Response exemples
```json
{
    "eventName": "La soirée de l'anneé",
    "descripton": "Une soirée a ne pas manquer ",
    "startDate": "2022-05-12T00:00:00.000Z",
    "endDate": "2022-05-14T00:00:00.000Z",
    "places": "Paris",
    "imageCover": "https://monimagedegroup.fr/img-icon45",
    "private": false,
    "members": [
        {
            "_id": "629679f09cf65702123f36cf",
            "role": "admin"
        },
        {
            "_id": "6290a3df4ff48a9ddcd131a0",
            "role": "member"
        }
    ],
    "id": "629af9d4dbfdce289a4f8985"
}
```

### Update Event [PUT]

```
http://yourhost.fr/event/update/:idEvent
````
Body exemples
```json
{
    "eventName": "La soirée de l'anneé",
    "descripton": "Une soirée a ne pas manquer ",
    "startDate": "2022-05-12",
    "endDate": "2022-05-14",
    "places": "Paris",
    "imageCover": "https://monimagedegroup.fr/img-icon45",
    "private": 0
}
```


### Add member Event [POST]

```
http://yourhost.fr/event/:idEvent/member/add
````
Body exemples
```json
{
    "members": [
        {
            "_id": "6290c4b481438f6574e71ce0",
            "role": "member"
        },
        {
            "_id": "6290a68b4ff48a9ddcd131a7",
            "role": "admin"
        }
    ]
}
```
### Delete Event [DELETE]

```
http://yourhost.fr/event/delete/:idEvent
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```

## User collection [/user]
[Back to feature](#features-)

In the user collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### User

+ id: (string, required)
+ lastname: (string, required)
+ firstname: (string, required)
+ age: (number, required)
+ password: (String, required, minlength: 8)
+ email: (String, lowercase: true, trim: true, match: [/.+@.+\..+/], unique: true, require: true,  index: true)
+ hash: true,
+	salt: true

### Create User [POST]

```
http://yourhost.fr/user/create
````
Body exemples
```json
{
    "firstname": "Mike",
    "lastname": "Mike",
    "age": 21,
    "password": "Azerty!26",
    "email": "Mike.Mike@email.com"
}
```

### Read User [GET]

```
http://yourhost.fr/user/view/:idUser
````
Response exemples
```json
{
    "firstname": "Mike",
    "lastname": "Mike",
    "age": 21,
    "password": "50pC0EzBxAqt8hS1tK4PTQ==$23FrTM3O5NcCXRLIdpItLtryLQ1h0vTq8Kmtf+G4WIYZYI2HWxqRTi+Jp3ktOTBqHiJHjEut6N7GJfHx8JOJXg==",
    "email": "dylan@gmail.com",
    "id": "629a261696587a45b59128c6"
}
```

### Update User [PUT]

```
http://yourhost.fr/user/update/:idUser
````
Body exemples
```json
{
  "firstname": "Mike",
    "lastname": "Mikael",
    "age": 50,
    "password": "Azerty!26982222",
    "email": "Mike.Mike@email.com"
}
```

### Delete User [DELETE]

```
http://yourhost.fr/user/delete/:idUser
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```
## Thread collection [/thread]
[Back to feature](#features-)

In the thread collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### Thread
+ id: (string, required)
+ event_id: (ObjectId, required, default: null)
+ group_id: (ObjectId, required, default: null)
+ messages: (Array)
  + content : (String, required)
  + author : (ObjectId, required)
  + comments : (Array)
    + author : (ObjectId, required)
    + content : (String, required)

### Create Thread [POST]

```
http://yourhost.fr/thread/create
````
Body exemples
```json
{
    "event_id": "6297872f4fa217c18f6bd881"
}
```

### Read Thread [GET]

```
http://yourhost.fr/thread/view/:idThread
````
Response exemples
```json
{
    "event_id": "6297872f4fa217c18f6bd881",
    "group_id": null,
    "messages": [],
    "id": "629afe8adbfdce289a4f898b"
}
```

### Add message in Thread [POST]

```
http://yourhost.fr/thread/:idThread/message/add
````
Body exemples
```json
{
    "messages": [
        {   
            "content": "Yoooo",
            "author": "629679f09cf65702123f36cf"
        }
    ]
}
```

### Add comment on message in Thread [POST]

```
http://yourhost.fr/thread/:idThread/comment/:idMessage
````
Body exemples
```json
{
    "comments": [
        {
            "author": "62998d450b47e694697b0f8d",
            "content": "Enfin !!"
        }
    ]
}
```

### Delete Thread [DELETE]

```
http://yourhost.fr/thread/delete/:idThread
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```
## Survey collection [/survey]
[Back to feature](#features-)


In the survey collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### Survey
+ id: (String, required)
+ name: (String, required)
+ event_id: (ObjectId, required)
+ author: (ObjectId, required)
+ questions: (Array)
  + question : (String, required)
  + responses : (Array)
    + resp : (String, required)

### Create Survey [POST]

```
http://yourhost.fr/survey/create
````
Body exemples
```json
{
    "name": "La question du siècle",
    "event_id": "6299a94b733fbe7a8bd839d9",
    "author": "62998d450b47e694697b0f8d",
    "questions": [
        {
            "question": "Quelle est la couleur du cheval blanc d'henry IV",
            "responses": [
                {
                    "resp": "Bleu"
                },
                {
                    "resp": "Blanc"
                },
                {
                    "resp": "Bleu"
                },
                {
                    "resp": "Vert"
                }
            ]
        }
    ]
}
```

### Read Survey [GET]

```
http://yourhost.fr/survey/view/:idSurvey
````
Response exemples
```json
{
    "name": "La question du siècle",
    "event_id": "6299a94b733fbe7a8bd839d9",
    "author": "62998d450b47e694697b0f8d",
    "questions": [
        {
            "question": "Quelle est la couleur du cheval blanc d'henry IV",
            "responses": [
                {
                    "resp": "Bleu",
                    "_id": "629b0019dbfdce289a4f8991"
                },
                {
                    "resp": "Blanc",
                    "_id": "629b0019dbfdce289a4f8992"
                },
                {
                    "resp": "Bleu",
                    "_id": "629b0019dbfdce289a4f8993"
                },
                {
                    "resp": "Vert",
                    "_id": "629b0019dbfdce289a4f8994"
                }
            ],
            "_id": "629b0019dbfdce289a4f8990"
        }
    ],
    "replys": [],
    "id": "629b0019dbfdce289a4f898f"
}
```

### Update Survey [PUT]

```
http://yourhost.fr/survey/update/:idSurvey/
````
Body exemples
```json
{
    "name": "La question du siècle",
    "event_id": "6299a94b733fbe7a8bd839d9",
    "author": "62998d450b47e694697b0f8d",
    "questions": [
        {
            "question": "Quelle est la couleur du cheval blanc d'henry IV",
            "responses": [
                {
                    "resp": "Rouge"
                },
                {
                    "resp": "Blanc"
                },
                {
                    "resp": "Bleu"
                },
                {
                    "resp": "Vert"
                }
            ]
        }
    ]
}
```

### Add Reply in Survey [POST]

```
http://yourhost.fr/survey/update/:idSurvey
````
Body exemples
```json
{
    "replys": [
        {
            "author": "62998d450b47e694697b0f8d",
            "question": "6299aa5e733fbe7a8bd839ec",
            "reply": "6299aa5e733fbe7a8bd839ee"
        }
    ]
}
```

### Delete Survey [DELETE]

```
http://yourhost.fr/survey/delete/:idSurvey
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```
## Gallery collection [/gallery]
[Back to feature](#features-)


In the gallery collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### Gallery
+ id: (ObjectId, required)
+ name: (String, required)
+ event_id: (ObjectId, required)
+ album: (Array)
  + photo: (String, required)
  + author: (ObjectId, required)
  + comments: (String, required)
    + author: (ObjectId, required)
    + content: (String, required)

### Create Gallery [POST]

```
http://yourhost.fr/gallery/create
````
Body exemples
```json
{
    "name": "Awessome Album",
    "event_id": "6299a94b733fbe7a8bd839d9"
}
```

### Read Gallery [GET]

```
http://yourhost.fr/gallery/view/:idGallery
````
Response exemples
```json
{
    "album": [
        {
            "photo": "maphoto.jpeg",
            "author": "629679f09cf65702123f36cf",
            "_id": "629a415285075619635eaf74",
            "comments": [
                {
                    "author": "62998d450b47e694697b0f8d",
                    "content": "Enfin !!",
                    "_id": "629a443437c650c7c2087e35"
                }
            ]
        },
        {
            "photo": "maphoto.jpeg",
            "author": "629679f09cf65702123f36cf",
            "_id": "629a415f85075619635eaf76",
            "comments": []
        }
    ],
    "name": "Awessome Album",
    "id": "629a3c46a80d0985d53064f7"
}
```

### Update Gallery [PUT]

```
http://yourhost.fr/gallery/update/:idGallery/
````
Body exemples
```json
{
    "name": "Une album de fou"
}
```

### Add Photo in Gallery [POST]

```
http://yourhost.fr/gallery/:idGallery/photo/add
````
Body exemples
```json
{
    "album": [
        {   
            "photo": "maphoto.jpeg",
            "author": "629679f09cf65702123f36cf"
        }
    ]
}
```

### Add Comment on photo in Gallery [POST]

```
http://yourhost.fr/gallery/:idGallery/comment/:idComment
````
Body exemples
```json
{
    "comments": [
        {
            "author": "62998d450b47e694697b0f8d",
            "content": "Enfin !!"
        }
    ]
}
```

### Delete Gallery [DELETE]

```
http://yourhost.fr/gallery/delete/:idGallery
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```
## Ticketing collection [/ticketing]
[Back to feature](#features-)


In the ticketing collection you will be able to : Create, read, update, delete groups, etc...(CRUD)

## Data structures

### Ticketing
+ id: (ObjectId, required)
+ event_id: (ObjectId, required)
+ tickets: (Array)
  + name: (String, required)
  + amount: (Number, required)
  + quantity: (Number, required)
+ purchases: (Array)
  + ticket_name: (String, required)
  + firstname: (String, required)
  + lastname: (String, required)
  + address: (String, required)
  + purchase_date: (Date, default: Date.now, required)

### Create Ticketing [POST]

```
http://yourhost.fr/ticketing/create
````
Body exemples
```json
{
    "event_id": "6299a94b733fbe7a8bd839d9",
    "tickets": [
        {
            "name" : "bronze",
            "amount" : 13.99,
            "quantity" : 12
        }
    ]
}
```

### Read Ticketing [GET]

```
http://yourhost.fr/ticketing/view/:idTicketing
````
Response exemples
```json
{
    "event_id": "6299a94b733fbe7a8bd839d9",
    "tickets": [
        {
            "name": "silver",
            "amount": 15.99,
            "quantity": 12,
            "_id": "629ad9ef1fae3c5c6ef5a897"
        },
        {
            "name": "bronze",
            "amount": 12.99,
            "quantity": 50,
            "_id": "629adb9b57597d3ddbf8da7e"
        }
    ],
    "purchases": [
        {
            "ticket_name": "bronze",
            "firstname": "Tom",
            "lastname": "Bost",
            "address": "13 Rue des grenouilles, Sens 89140",
            "_id": "629adf03dbfdce289a4f897c",
            "purchase_date": "2022-06-04T04:26:43.338Z"
        },
        {
            "ticket_name": "bronze",
            "firstname": "Tom",
            "lastname": "Bost",
            "address": "13 Rue des grenouilles, Sens 89140",
            "_id": "629ae6b6dbfdce289a4f897e",
            "purchase_date": "2022-06-04T04:59:34.332Z"
        }
    ],
    "id": "629a5be94c03dd430f85ecb1"
}
```

### Update One Ticker in Ticketing [POST]

```
http://yourhost.fr/ticketing/update/:idTicketing/ticket/update/:idTicket
````
Body exemples
```json
{
    "tickets": [
        {
            "name": "silver",
            "amount": 15.99,
            "quantity": 12
        }
    ]
}
```

### Add One ticket in Ticketing [POST]

```
http://yourhost.fr/ticketing/:idTicketing/ticket/add
````
Body exemples
```json
{
    "tickets": [
        {
            "name": "bronze",
            "amount": 12.99,
            "quantity": 50
        }
    ]
}
```

### Buy a ticket in Ticketing [POST]

```
http://yourhost.fr/ticketing/:idTicketing/buy
````
Body exemples
```json
{
    "purchases": [
        {
            "ticket_name": "bronze",
            "firstname": "Tom",
            "lastname": "Bost",
            "address": "13 Rue des grenouilles, Sens 89140"
        }
    ]
}
```

### Delete Ticketing [DELETE]

```
http://yourhost.fr/ticketing/delete/:idTicketing
````
Response exemples
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```
