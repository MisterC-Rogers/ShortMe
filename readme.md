# URL Shortener
-----

Custom URL Shortener and branded URLs with advanced links tracking and Link Management Platform & API. Targeted to users with the ability to register and log in. Shorten and replace a long URL with a short link.

Made with:
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](http://expressjs.com/)
- [Passport](https://www.passportjs.org/)
- [MongoDB](https://www.mongodb.com/)

Styles made with:
- [Bootstrap5](https://getbootstrap.com/)

Templates made with:
- [eJS](https://ejs.co/)

## Get Started

##### Install

```javascript
yarn install
//or
npm install
```

##### Change credentials database (.env)

```
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.0gypu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
SECRET="<Your secret string>"
PORT=<your port number>
```


##### Run

```javascript
yarn devStart
//or
npm run devStart
```

##### Routes

| Route           | Type           | Protected          | Status               |
| -------------   |:-------------: |:-------------:     |              -----:  |
| /               | GET            |                    |   :white_check_mark: |
| /:shortUrl      | GET            |                    |   :white_check_mark: |
| /shortUrls      | POST           | :white_check_mark: |   :white_check_mark: |
| /login          | GET            |                    |   :white_check_mark: |
| /login          | POST           |                    |   :white_check_mark: |
| /register       | GET            |                    |   :white_check_mark: |
| /register       | POST           |                    |   :white_check_mark: |
| /userprofile    | GET            | :white_check_mark: |   :white_check_mark: |
| /update/:id     | POST           | :white_check_mark: |   :white_check_mark: |
| /remove/:id     | POST           | :white_check_mark: |   :white_check_mark: |
