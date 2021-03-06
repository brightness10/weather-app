# weather-app
A simple mobile web app for getting the current weather of chosen locations around the world. Built on MVC principles using jQuery with an Express server that utilizes a MongoDB database.

## How to use
- Use the search bar to find out the current weather at a city of your choice.
- Tap a city from the list to check out its current weather.

<img src="gifs/search_and_select.gif" width="250" height="500" />

- Each city weather data will automatically refresh every 20 mins, But if you're anxious to see if there's new data for the displayed city tap the refresh icon at the bottom left corner of the current weather window.
- Remove a city from the list by tapping the X icon.
- Tap the pin icon to save a city so it will persist on refresh.

<img src="gifs/refresh_save_delete.gif" width="250" height="500" />

You can check out the web app [live on Heroku](https://how-is-the-weather.herokuapp.com/).

I highly encourage you to give it a try on your mobile device (preferably on Chrome) so you can view the app as it was intended to be used, if you must use your desktop at least go on mobile mode (`CTRL`+`SHIFT`+`I` then `CTRL`+`SHIFT`+`M`).

Allow access to current location in order to get the current weather in your location on start up.
