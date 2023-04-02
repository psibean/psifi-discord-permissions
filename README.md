# Psifi Discord Permissions

Originally this was a bit of a fun project, where I didn't realise that Discord itself had the option to view a server as a variety of combined roles. The idea of this app was that, you could add and remove roles, and it would show you all of the permissions across your server as if you were a member with those roles.

The frontend is not my best work and was a huge WIP.

Making this open source upon request, for learning by example.

I eventually plan on taking the OAuth2 PKCE code in this package and publishing a few packages to provide easy to use OAuth2 express middleware. 

You can see this app up and running here: [https://bot.psifisolutions.com](https://bot.psifisolutions.com)

## Getting it running

Run `npm install` in both the frontend and the backend.

Copy the example .env files in both the frontend and the backend to `.env` files.

Fill in the environment variables required.

Run:

```
npm run dev
```
in the frontend, and
```
npm run start:ts
```
in the backend folder, then navigate to `http://localhost:5173` by default, may vary based on your port usage.