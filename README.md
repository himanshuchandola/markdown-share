<!-- Original file: https://www.iconfinder.com/icons/4394350/logo_logos_markdown_icon -->
<h1 align="center">
  <img alt="Markdown" src="./public/favicon.svg" width="140" /><br/>
  .mdShare
</h1>

<h3 align="center">
  Best way to share your markdown files.
</h3>

<p align="center">
  <a href="http://commitizen.github.io/cz-cli/"><img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"></a>
  <img src="https://img.shields.io/badge/License-AGPL_v3-blue.svg" alt="License">
</p>

## 📄 Share and Collaborate Effortlessly with .mdShare

Tired of struggling to share and collaborate on Markdown files? Finding it cumbersome to manage multiple versions of the same document while working with others? Look no further! Introducing **.mdShare**, the ultimate self-hosted solution for hassle-free Markdown file sharing and collaboration.

## 💡 The Challenge: Sharing Markdown Files Made Difficult

The **.mdShare** Solution: Simplify Markdown File Sharing. Effortless Sharing: Upload your Markdown files with a few clicks, preserving all the formatting, making it convenient for you.

## 🚀 Getting Started

### How to deploy locally:

- make sure `mongodb` is running

- set up variables in `.env` file, check table [Settings](#%EF%B8%8F-settings)

- Install dependens:

  ```bash
  yarn install
  ```

- Build your application:

  ```bash
  yarn build
  ```

- Start the Node.js server:

  ```bash
  yarn start
  ```

- And you can check the site on [`localhost:3000`](http://localhost:3000)

### Deploy the app:

You can deploy this application to any hosting platform (also don't forget to set up environment variables)

- [![Deploy Mongo Cloud](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas/database) - Use it for free for mongodb instance.

## ⚙️ Settings

|     variable     | description                                                                                                                            |
| :--------------: | -------------------------------------------------------------------------------------------------------------------------------------- |
|    `APP_URL`     | URL of your application such as your domain `https://example.com` or `http://localhost:3000` (needed for SEO and generate links)       |
|   `MONGO_HOST`   | host is the server where your mongodb server is running                                                                                |
|   `MONGO_PORT`   | port that mongodb server is listening on                                                                                               |
|   `MONGO_USER`   | user is an account that is used to authenticate and access the database                                                                |
|  `MONGO_PASSWD`  | password is used to authenticate the user who is accessing the database                                                                |
| `MONGO_DATABASE` | name of the mongodb database that your application will connect to                                                                     |
|   `MONGO_URI`    | you can specify the connection string for a mongodb database instead of the previous variables (has higher priority, empty by default) |

## 🔧 Tech Stack

- `TypeScript` — syntactic superset of JavaScript which adds static typing.
- `React` — library for building user interfaces based on components.
- `Next.js` — framework that allows you to create React applications that you can render on the server.
- `Testing Library` — very light-weight solution for testing without all the implementation details.
- `MongoDB` — NoSQL database that stores data in JSON-like documents.
- `PostCSS` — tool for transforming CSS with JavaScript-based plugins.
- `markdown-it` — markdown parser to generate HTML.

## 🤝 Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## 📝 License

Distributed under the AGPL-3.0 license. See [`LICENSE`](./LICENSE) for more information.
