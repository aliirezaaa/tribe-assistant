
# Tribe Assistant

Tribe Assistant is an app on the Tribe platform to help community owners to get more insights about users' posts.


---

Add the "Tribe Assistant" app to a community on the Tribe platform.

The app receives webhooks when a post is published to any space of a network in the Tribe community.

Then the app checks webhook validity and extract data from the body of the webhook and passes it to a natural language process service like Google or Microsoft.

Using an NLP service helps to classify post content sentiments and categorize them.

Finally, the general sentiment and category of the post data are stored in the database with the actual post content

## Features

- Classify sentiment of posts
- Classify category of posts
- Ability to Use Google NLP service or any other NLP services
- Storing analyzed posts in the database


## Idea
## Demo

Insert gif or link to demo


## Tech Stack

**Database:** Postgres

**Core service:** Nestjs

**Database UI Client:** pgAdmin

**Queue Managment:** BullQ

**Queue-Storage:** Redis



## API Reference

#### Handle Tribe webhooks

```http
  POST /tribe/webhook
```


#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Listen port of service

`DATABASE_USER` - Database username

`DATABASE_HOST` - Database host

`DATABASE_PASSWORD` - Database password

`DATABASE_NAME` - Database name

`DATABASE_PORT` - Database port

`NETWORK_ID` - Networkd Id of Tribe app

`CLIENT_ID` - Client Id of Tribe app

`CLIENT_SECRET` - Client secret of Tribe app

`SIGNING_SECRET`- Signing secret of Tribe app

`GRAPH_QL_URL` - Tribe graphql url

`REDIS_HOST` - Redis host

`REDIS_PORT` - Redis port

`MINIMUM_WORD` - Minimum number of words to pass into NLP service

`NLP_SERVICE` - Name of NLP service (eg: google)

## Appendix

Any additional information goes here


## Authors

- [@katherinepeterson](https://www.github.com/octokatherine)


## Feedback

If you have any feedback, please reach out to us at fake@fake.com


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Roadmap

- Additional browser support

- Add more integrations


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Acknowledgements

 - [Tribe](https://tribe.so/) 
 - [Tribe devhub community](https://community.tribe.so/devhub/)


## Documentation

[Documentation](https://linktodocumentation)

