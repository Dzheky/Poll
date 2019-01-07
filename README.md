**What you have done and how far you got in time**

For this senior frontend developer assignment, I've decided to create my own backend, this way this assignment would be closer to a real-world scenario. The data is fetched from the outside source and stored on my server with its small local JSON database. On the frontend, I've developed a responsive application that fetches sports events from backend grouped by randomly chosen sport and works only with that portion of data. When you submit your vote on the client side, it sends data to the server using its API and after registering your vote it returns updated event back to the client.
I've allocated several days to develop this application, I've been working no more than 2 hours per day because of time constraints. In total, I think I've spent around 10 - 12 hours on this assignment.

**Which development tools you used and your general progression on the key issues, what you got stuck on, what you did or didn’t solve etc.**

On the frontend, I decided to use `create react app` to quickly jumpstart the project I also used `Redux` for state management and `Reselect` to make selectors. On the backend I used `NodeJS` with `Express` to quickly create simple API, `Lowdb` for the small local database and `Got` to make easy REST requests. The CLI I used `Concurrently` to run two commands concurrently, this way I could start server and client application at the same time without the need to build it.

The thing that I got stuck on is progressive image loading. I wanted to make progressive image loading similar to [Medium](http://medium.com/) for my background sports images, but after a couple of tries, I decided that it would be time-consuming because of my lack of experience with them and wouldn't be worth the time for this test assignment.

The other issue was deciding what media queries breakpoints to use. After I gave it a little thought I went with using only the couple of breakpoints and make the application to stretch between those points, so it would cover all the possibilities. I did a little research about average screen sizes of tablet and smartphone and used them as my media queries breakpoint.

**A step by step instruction to how to run the project**

After downloading run two simple commands from the root of the project:

`npm run setup`

`npm start`
