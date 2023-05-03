# Software Requirements

## Vision

The vision of this application is an interactive dashboard that is designed to be a Coder's Best Friend! This is for coders who want an easy to read, and easy to access webpage with all their tasks, goals, resources, and a calendar at their finger tips.

## Scope (In/Out)

### IN - What will your product do?

+ The web app will provide a log in system that customizes the user's experience based on their inputs.
+ The web app will display a dashboard with all previously entered information from the user.
+ The dashboard will have a To-Do list function, where you can add, remove, or edit the list items.
+ The dashboard will have a displayed calendar based on your To-Do tasks.
+ The dashboard will have a list of Resources that start with basic links but could be added to/removed by the user.
+ The web app will display a random meme to make you smile.

### OUT - What will your product not do?

+ Our product should not lose sight of the users in mind - we could create a To-Do list for just ANYONE but this one is Coder specific!

### What will your MVP functionality be?

A functional Dashboard (that uses your User Info) including: ToDo List, Random Meme (via API), Calendar (via API), Progress Graph, Resources, and About Us page.

### What are your stretch goals?

Including a daily Code Challenge via GPT

### What stretch goals are you going to aim for?

If time allows, the Code challenge that'll get a coding challenge based on a specified Language provided by the user

### Functional Requirements

+ A user can Log in/create account via Auth0
+ A user can access their own To-Do list, calendar, and progress graph via dashboard
+ A user can add/remove/edit items on the To-Do List
+ A user can view a Random Meme generated via API call
+ A user can view, add, remove, or edit their Resources.
+ A user can view a calendar with their due dates for tasks

### Data Flow

User lands on splash page. They must pick an Auth0 option, log in or create account. Re-directs to Dashboard, where you can see a To-Do list, a randomized meme, a calendar, and a resources list. The user can add items to the To-Do list, including a date if they want to include it. They can mark these items as "done" but also edit or delete these To-Do items. There will be a way to do a full clear of the list & any saved information. If a date is included, it will populate onto the calendar, which tells of upcoming due dates. User can also add to/remove items from the Resource list, which is populated with a small amount of default resources. There is also a link in the NavBar to go to our About Us page, displaying information about our team.

### Non-Functional Requirements (301 & 401 only)

+ Security: Our application will make use of the ENV file properly. This will be to keep our API log ins/codes secure, MongoDB secure, etc.
+ Speed: Our application will make use of our Mongo Database as often as possible. This is so we do not wait on API calls or overload the API call limits. Our application will also make use of Caching where MongoDB is not applicable
+ Testing: Our team will utilize ThunderClient to test connection and response from APIs
