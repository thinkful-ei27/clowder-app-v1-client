## DEPLOYED AT: https://clowderv1.herokuapp.com/

Welcome to Clowder, an event planning webapp the is straight forward and helps simplify event planning. You can use this app to create events and share the info with potential attendees. 

This app was built using Create React App to bootstrap the frontend with React. State/store management is maintained through Redux and Thunk. With Redux-form handeling all forms and date information/instances are implemented through momentJs. All front-end testing is being run through Enzyme.

The backend is an express app built on Node with a mongoDb database handled by mongoose. User authentication is protected using JWT and validated via passport. Tests are run with Mocha/Chai/Chai-http. 

You can find the backend code files here: 

Screenshots of the app in the wild:

**Dashboard**
![Dashboard](/images/Dashboard.png)

**Create an Event**
![CreateEvent Page](/images/CreateEvent.png)

**Upcoming Events**
![List of Upcoming Events](/images/Upcoming.png)

**Past Events**

![List of Past Events](/images/Past.png)

**Event Info**
![Event Info Page](/images/Event.png)

**Public Invite**
![Public Invite Page](/images/Invite.png)

**User Info**
![User Info Page](/images/UserInfo.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
