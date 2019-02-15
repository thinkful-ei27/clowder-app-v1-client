## DEPLOYED AT: https://clowderv1.herokuapp.com/

Welcome to **Clowder**, an event planning webapp that is straight forward and helps simplify event planning. You can use this app to create events and share the info with potential attendees. This is a rough v0.1 and there is much more in store foe Cloweder down the line including Google Calendar and Maps integration, image galleries, RSVPs, and sharing events between user accounts so you can see what all your friends are up to.

This app was built using [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the frontend with React. State/store management is maintained through Redux and Thunk. With Redux-form handeling all forms and date information/instances are implemented through momentJs. All front-end testing is being run through Enzyme.

The code base is organized into logical folders to help you navigate. 

* All components dealing with event creation, sharing, editing, etc can be found in *src/components/events*.
* All components dealing with user creation, login, changin info, etc can be found in *src/components/users*
* All other webcomponents such as the navbar, header, landing page info, etc can be found in *src/components/elements*.
* All components dealing with user creation, login, changin info, etc can be found in *src/components/users*
* Actions and reducers for making AJAX calls and managing the store/state can be found in *src/actions* and *src/reducers* respectively.

The backend is an express app built on Node with a mongoDb database handled by mongoose. User authentication is protected using JWT and validated via passport. Tests are run with Mocha/Chai/Chai-http. 

You can find the backend code files [**here**](https://github.com/thinkful-ei27/clowder-app-v1-server)

For the backend, Events and Users are segmented into their own folders. Each contains a router.js file, a models.js file describing its database schema, and an index.js to combine the router and model and export them to the server. The server.js lives in the root folder. the Auth folder is similar to Users and Events but has no models.js file, instead it has a strategies file describing the local and jwt authentication.

Screenshots of the app in the wild:

### Dashboard
![Dashboard](/images/Dashboard.png)

### Create an Event
![CreateEvent Page](/images/CreateEvent.png)

### Upcoming Events
![List of Upcoming Events](/images/Upcoming.png)

### Past Events
![List of Past Events](/images/Past.png)

### Event Info
![Event Info Page](/images/Event.png)

### Public Invite
![Public Invite Page](/images/Invite.png)

### User Info
![User Info Page](/images/UserInfo.png)

