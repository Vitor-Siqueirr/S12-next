# s12-Next by Vitor Siqueira

# Overview

The challenge consists of converting the [**Rooms**](https://gitlab.com/henrique.yuji/trainees-react-separation-of-concerns-2) application to NextJS and deploying it to Vercel.

# Requirements

## Task 1 - Routing

Originally, our application uses a rudimentary form of navigation that relies entirely on the application's state, and while this does work well, we want to use NextJS's routing capabilities so that we have the following benefits:

- Navigation state is encoded in the URL, so that they are bookmarkable/sharaeable and provide better SEO.
- Different pages are code-split so we don't need to download the entire application at once.
- Besides code splitting, we also get prefetching of the split chunks.
- Navigation works seamlessly with the browser's back/forward button.

We want to have our entire navigation converted to NextJS's routing system, so each "view" (Students, Rooms, Inventory) will have its own page.

On top of that, as for the Rooms and Students views, we want each "sub-view" where we see a specific room/student's calendar to also be mapped as a sub-route.

The structure should be as follows:

- Rooms -> `/rooms/[id]`
- Students -> `/students/[id]`
- Inventory -> `/inventory`

Additionally, when navigating to the home page (`/`), the user must be redirected to the page of the **first** existing room.

## Task 2 - Data Fetching

Currently we're fetching data on the **client side**, but now we want to leverage NextJS's SSR capabilities and move the data fetching to the server instead.

Moving forward, all API calls should be done in the server using `getServerSideProps`.

Notice that only **serializable** properties can be sent over the wire by `getServerSideProps`, therefore anything that's not serializable (e.g. Dates), must be first serialized on the server and then deserialized on the client.

## Task 3 - Deployment

The application must be deployed in Vercel.

## Task 4 (Extra) - Statically Building Rooms and Students Pages

Build **all** Rooms and Students pages **ahead of time, in build time**, so that their load speed is improved.

This means that now, for each Room/Student page we should get the built page without having to fetch data on the server during run time.

## Task 5 (Extra) - Navigation Overlay

Sometimes navigation might take some time to finish, and during that time we want to provide some sort of visual feedback to the user.

Create an overlay that will appear over the Page's content (but NOT over the navigation header!) that prevents the user from interacting with it, while also allowing the user to interact with the navigation header.

Something like this:

![example](https://user-images.githubusercontent.com/20905415/266875702-c9d89ced-d002-48bf-a9ee-147eec3de009.gif)
