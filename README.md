# se-project

Project for Software Engineering (Movie Review Site)

Welcome to our project!

!!! Login credentials at the bottom !!!

Heroku link: https://se-project-burch.herokuapp.com/login

The main idea behind the site is that users can check movie reviews.

The website includes a fully functioning authentication and authorization process, JWT tokens are used for authorization sent to the user as a cookie.

We currently have two roles on the website: regular user and the editor.

Users can browse through movie reviews where they can see the movie title, poster, what the movie is about, the editors thoughts and opinions, movie rating and the actors starring in the movie. If they like the premise of some movie, they can add it to their bookmarks to keep track of the movies they want to watch.

Users can also search the movie database to see if there's a review for the movie they have in mind.

On the other hand, editors can create new reviews, as well as delete and update the existing reviews posted by other editors.

If a user were to try and create a new review, they would get taken to a 403 page.

Note:

Future plans (may change): choose poster image, add movie trailers from youtube, actor database and more.

Since the db hosted website only allows 5MB of storage, We're currently using the same movie poster for every new movie review created, however we will try to come up with a better way for editors to set their own poster (something like storing and imgur link in the database instead of an image).

Feel free to create your own account to test the system, however you will only get access as a regular user, so here are the login credentials as an editor:

email: admin@gmail.com
pass: abc123
