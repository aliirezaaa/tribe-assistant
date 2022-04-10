
# Tribe Assistant

Tribe Assistant is an app on the Tribe platform to help community owners to get more insights about users' posts.


---

Add the "Tribe Assistant" app to a community on the Tribe platform.

The app receives webhooks when a post is published to any space of a network in the Tribe community.

Then the app checks webhook validity and extract data from the body of the webhook and passes it to a natural language process service like Google or Microsoft.

Using an NLP service helps to classify post content sentiments and categorize them.

Finally,  in addition to the general sentiment and category of the post data, the actual post content, author, and published time are stored in the database.

## Features

- Classify sentiment of posts
- Classify category of posts
- Ability to Use Google NLP service or any other NLP services
- Storing analyzed posts in the database


## Idea
As a community owner, you may have multiple spaces about your products or any other content. your members post about your product every day and they share their reviews with each other. these posts include good reviews or bad ones and it is important to respond to them.
usually, the owner wants to respond to negative sentiment reviews quicker and help the author of the review.
but if there were many posts with huge content, the owner should read all of them and realizes the sentiments of the post, and respond to them. but as it's clear, this process takes a lot of time.
In this situation, the Assistant app comes to help community owners.

The Assistant app realizes post sentiments and their category of it using the natural language process. this helps the owner to respond to each post that needs a quicker response.

In the future release of the Assistant app, it could generate a suitable response based on post content, sentiments, and category of it and reply to post.
## Demo

[Tribe Assistant App Introduction](https://www.youtube.com/watch?v=ruCnhlESUns)

## Architecture
![Architecture](https://github.com/aliirezaaa/tribe-assistant/blob/main/architecture.png?raw=true)
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

## Run Locally

- Please follow this link to prepare Google Natural Language Processing service
 
    [sentiment analysis google client libraries](https://cloud.google.com/natural-language/docs/sentiment-analysis-client-libraries)

 
- Clone the project

- Install dependencies

    ```bash
    npm install
    ```
- Run external services like Postgres and Redis


- Start the server

    ```bash
    npm run start
    ```

- Also you can use docker to start server. 
    ```bash
    docker-compose up
    ```


## API Reference

#### Handle Tribe webhooks

```http
  POST /tribe/webhook
```




## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Tech Stack

**Database:** Postgres

**Core service:** Nestjs

**Database UI Client:** pgAdmin

**Queue Managment:** BullQ

**Queue-Storage:** Redis



## Feedback

If you have any feedback, please reach out to me at javaheri.manesh@gmail.com


## Roadmap

- Auto reply to post by generating a suitable response based on post content, sentiments, and category of the post



## Acknowledgements

 - [Tribe](https://tribe.so/) 
 - [Tribe devhub community](https://community.tribe.so/devhub/)


## Documentation
Documentation can be reach by generating it
```bash
    npx @compodoc/compodoc -p tsconfig.json -s -r 8050
```
Then open http://localhost:8050
