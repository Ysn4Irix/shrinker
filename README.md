<p align="center">
 <img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1685399080/YsnIrix/lsmcx9owkq68cw4qhuwz.svg" align="center" alt="screens" />
</p>

<br>

<p align="center">
  <b>A full stack URL shortener web application with user authentication built with
  </b>
</p>

<p align="center">
<a href="https://kit.svelte.dev">
<img width="100px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1663804918/yassi/mxrjfvymnux04jhjwlh2.svg" align="center" alt="svelte" />
</a>
</a>
&nbsp; &nbsp;
<a href="https://tailwindcss.com">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1660842725/yassi/dglubft3rg2iuh6fxsaf.svg" align="center" alt="tailwind" />
</a>
&nbsp; &nbsp;
<a href="https://preline.co">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1685913498/YsnIrix/eppcq6spuxlainlyono3.svg" align="center" alt="pr" />
</a>
&nbsp; &nbsp;
<a href="https://pocketbase.io">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1685915741/YsnIrix/nxonent0unhxsmsm45qa.svg" align="center" alt="pb" />
</a>

</p>

<br>

<p align="center">
  <img src="https://res.cloudinary.com/ydevcloud/image/upload/v1685915350/YsnIrix/ayjp66iqmnaqhwvnm3ib.png" alt="screens" width="1000px" style="border-radius: 5px;">

</p>

<br>

**_I start learning the most beloved framework [Sveltekit](https://kit.svelte.dev) and that's what i'm using in the frontend_**

## ❯ Features

- Login/register with Google
- Login/register with Github
- Authentication using email/password with email verification
- Resetting the Password
- Create a short link and set an expire period to it (Optional)
- Get all links associated with the authenticated user
- Delete the short link
- Edit user profile (Profile Photo & Fullname)
- Edit user account (Changing email & username)
- Edit user security (Changing password & deleting user account)
- All User entries are server side validated using [Zod](https://zod.dev/)

![📟](https://res.cloudinary.com/ydevcloud/image/upload/v1656874185/asm9cp84cbuuqmarw9wq.png)

## ❯ Getting Started

Live demonstration of the application available [Here](https://shrinker.ysnirix.live/)

- Download the [latest version of Pocketbase](https://pocketbase.io/docs/) and run the executable with `./pocketbase serve` or deploy it to a cloud provider
- Import collections from `pocketbase-collections.json` to your pocketbase instance found in this link: [http://localhost:8090/\_/?#/settings/import-collections](http://localhost:8090/_/?#/settings/import-collections).
- Register an app with your OAuth provider to acquire a `Client ID` and `Client Secret` :
  (for Google, you can create a [Google App here](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)).
  (for Github, you can create a [Github App here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)).

  From there, you should be able to set the `Redirect URL` (if applicable) of your OAuth App to `http://localhost:5173/auth/login`

- Register your app as an OAuth provider inside pocketbase (which can be accessed [here](http://localhost:8090/_/?#/settings/auth-providers) if you're working locally with the default PB host settings) or read the docs [here](https://pocketbase.io/docs/authentication/#oauth2-integration)

### Env

Rename the `.env.example` file in the root directory of the repo to `.env` and populate it with the following:

```bash
PUBLIC_POCKETBASE_URL="http://localhost:8090" # default
```

### Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
# or start and open the app in a new browser tab
npm run dev -- --open
```

### Building

```bash
npm run build
node build
```

> You can preview the built client app with `npm run preview`,This should _not_ be used to serve your app in production.

<br>

![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)

## ❯ About

<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and features requests, [please create an issue](../../issues/new).

![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)

## ❯ License

Copyright © 2023-present, [Ysn4Irix](https://github.com/Ysn4Irix).
Released under the [MIT License](LICENSE).
