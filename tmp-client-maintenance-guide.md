## Client Side
Our client side is a React-native application written on Expo platform. 

React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android. It’s based on React, Facebook’s JavaScript library for building user interfaces, but instead of targeting the browser, it targets mobile platforms.
Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
You can find most options and best practices here: 
https://reactnative.dev/
https://docs.expo.dev/

The design of our app is especially adapted for iOS devices, of course we can make adjustments in the future in order to improve the compatibility for Android devices as well. It is important to note that the app supports iOS and Android devices, but the latter design is flawed.

The app supports two types of users : usual and admin ones. Usual user is the event manager that will use the app - for more information look at the user guide. Admin users has access to all users data and it can manage all the maintanace actions.

Let’s talk about how to set up the project for the first time locally, what the project structure looks like and how we can expand the project in the following features.


![folders](https://user-images.githubusercontent.com/48642967/173821896-a8c6b2bd-806f-47bd-b691-97f60e7d136f.PNG)

### Get started - project configuration 
1. Clone the project from GitHub with the url present on the introduction step. 
2. In order to run the project locally: 
	a. Make sure you have installed npm by run command "npm --v" (and if not https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/).
	b. Make sure you have installed yarn by run command "yarn --v" (and if not https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable/).
	c. Install expo-cli - run command "npm install --global expo-cli" (https://docs.expo.dev/get-started/installation/) make sure by running "expo --v".
	d. Install all packages and dependencies.
	   Let's introduce package.json file, this file includes all names and versions of the packages on the project.
	![packagejson](https://user-images.githubusercontent.com/48642967/173824325-9555b892-b54d-4bf4-8525-81dfcce76a30.png)
	   in order to install all packages and dependencies - run command "yarn install" - that uses package.json for that purpose. after this installation a new file 'yarn.lock' and 'node-modules' folder will be generated, this files is on your computer and not supposed to share between developers - gitignore (could make confugraion problems).
	 e. Run command "expo start" to run the project. on this point our client app is running. we can see a QR code on the terminal or on the localhost server that we can see on the terminal. 
	 f. Download "expo" application on your mobile device or on emulator, and scan the QR code by the app or by your camera. You can run the app there, and even debug it on "Debug mode" - more inforamtion on expo documantion (link above).
	 g. Re-install - packages and dependencies errors - in such case you can try to 
		- Delete node modules folder
		- Delete yarn.lock file
		- Run "yarn install" again 

### Directories and Project structure 
#### App.js, useContext

**App.js:** 
This is the root of the project. Basicly this is the father components, and it is wrapping all other components. Here we are starting to define our navigation mechanisem (more info on navigation folder) and the global context field and more.

**useContext:** 
We used this hook to manage the use of all global fields of the system and allow to access them from anywhere at any stage to their most up-to-date value.
Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.
When the nearest <MyContext.Provider> above the component updates, this Hook will trigger a rerender with the latest context value passed to that MyContext provider. A rerender will alwys happen starting at the component itself using useContext.

How to...
	1. Add new global field. 
		Go to app.js -> add new field as state -> add this field as a property of userAuth.
		![image](https://user-images.githubusercontent.com/48642967/174038368-0c76b18c-b675-4494-a4b9-2c745c9b0aff.png)
		Here you can see how the this userAuth wrap the whole application and that way you can access it anywhere. 		
		![image](https://user-images.githubusercontent.com/48642967/174038764-dd3b7ff5-9076-43ed-9375-2ae61ba0675b.png)

		
	2. Get/Set Context's fields.
		 This is one example of using useContext() function. 
		 On the second line you can see how we take the rellevnt fields for this page from the context we define before.
		 ![image](https://user-images.githubusercontent.com/48642967/174039703-940bab9e-a0b3-429e-b02b-424f646f6375.png)
		 
		 In our example, for Get - we used isLoading, for Set - we used setIsLoading -> that way we could use this global fields on our app.
		 One more example for the need in this hook - will be the Token that we get back from the server, and should use it on each api request we made to the server. 
		

#### common directory

The purpose of this folder is to contain all functions and fields that will be re-used on many places on the app.

The main effort is to focus all constants, images, fonts, colors, etc. on one place. Further to that our developers should use exist configurations, fields and functions from here and add relevant once to expand this common package.

**-- common package structure -- **

    ../api >> contains all api request functions. 
    ../assets >> contains design constans - images, fonts
    ../constants >> contains colors, error handling and logging, all urls. 
    ../entities >> contains entities that we want to get or post to the server
    ../global >> contains global fields we used all over the project
    ../validation >> contains all validation functions

![image](https://user-images.githubusercontent.com/48642967/174045111-49c3d76a-743b-4ee7-892f-5cc7f5f000b2.png)

#### lindsly-style-react (we should combine components and style folders for that and put here link to figma)

Our application design was developed by a UX Designer. A big part of the app's success depends on its visibility and total look.
Following this, we decided to set up our own components library:  lindsly-style-react. Our goal was to maintain a uniform look across all screens, to make changes easy, to be open to the expansion and addition of additional screens in the future and also to separate logic from design.

In a scenario where a change in the existing design will be required, all the developer will have to do is find the component in the exisiting library and change its design with the help of React Native's base components.
In a scenario where the developer will be required to add new elements to screens that do not yet exist in the application, he will need to create a file in the appropriate place under the components folder and simply create the element using React Native.
We emphasize that we do not design elements in the screens and logic files but only within our components library.

So if you are a new developer on our team... 

	>> use exist components if it's already exists. 
	>> if not, add your new component in the appropriate folder accordingly by division, do not be afraid to open a new folder if you are dealing in a new field.
	>> when the style of the component is relevent to this specific component - maintain a style sheet inside the component. 

![image](https://user-images.githubusercontent.com/48642967/174046976-34422086-9154-4ff5-947d-4d6982212ea6.png)

#### screens

In this folder we have all the components that are screens on the app. 
The screens seperate to some folders: add-event-screens, event-manager-screens, main-screens, user-profile-screens.
If you need to add one more screen to the app, that's the place to open it.

![image](https://user-images.githubusercontent.com/48642967/174048097-be3c3397-2c71-4f1a-85c9-78c6a8392159.png)


#### navigation

So this is how the whole navigation is working on our app. 
Let's start with that: there are two types of navigations methods that we used on our app; stack navigator and tab navigator.
If you are not fimiliar with those navigation methods - you should read about that on the doc manual.
https://reactnavigation.org/docs/stack-navigator/
https://reactnavigation.org/docs/bottom-tab-navigator/

So now we are familiar with that, let's talk about how it works. 
1. On App.js file we are wrapping all our components tree with the "Navigation Container" that enables for us the ability to navigate.
![image](https://user-images.githubusercontent.com/48642967/174050192-b45dd3e1-8e49-4878-81ab-eac74952bcc5.png)

2. Our main navigator is the WelcomeStackScreen navigator that we can see on App.js as well. 

3. Now let's talk about the navigation folder. 
![image](https://user-images.githubusercontent.com/48642967/174050485-5c78d1cb-ca8b-4df8-b15d-f7a56620a6a6.png)

The first stack, as we already see, that's the welcome stack - that contains the welcome page (with the logo), registration page, and the tab navigator. 
That way, after the user logged in - he could see the bottom tab navigator. 
The tab navigator contains four options, each of them takes us to a new stack that we can go throght pages with it.
![image](https://user-images.githubusercontent.com/48642967/174051476-ec68120b-dafc-4f99-9a9a-f349129575c3.png)

We can mention the hierarcy of the navigation components: 
WelcomeStack --> TabNavigator --> HomePageStack ... 
This hierarcy gives us the option to see the bottom tab navigator all over the use on the app. 
On the other hand, it can cause circles of calling to pages that can have some problems. 

How to add new page to the navigation...
	1. Choose which stack navigation you want your page to be part of.
	2. Add new page component - more info on screens paragraph or on the example at the end.
	3. Add your page as a navigation screen on the navigator you choose.
		![image](https://user-images.githubusercontent.com/48642967/174052185-c12195ee-3fe3-44dc-b656-484bd37e9c37.png)

How to navigate from one page to another?
	1. You can see a lot of that all over the project and should read about that on React documantions.
	2. On each component that you defined as a page (on the navigators) - you could use props.navigation or UseNavigation() function.
	3. This prop gives you some useful function to use: 
		a. navigation.navigate("pageName") - navigate to specific page on your stack navigator
		b. navigation.pop() - pop us the last page from your stack and navigate to the last one you came from.
		c. etc.
![image](https://user-images.githubusercontent.com/48642967/174053137-1f8df10d-bf8f-4c45-bdf5-0e9357215c12.png)


#### tests
	This folder inlcudes all our UI tests. more information about that on the test guide.
	
	As mentioned our app was written in React Native. React Native Components Library is a large and well-known library. As a result we have come to the conclusion that there is no need to perform UI tests, since the basic elements of the language have already been tested by its writers and there is no need to perform tests that we know in advance will pass. 
Therefore, we have written in this section Integration tests and e2e tests that check the main app's flows and APIs.

### Expansion
#### Reusable code
	Let's say some words about reuse components and common, lindsly-style-react, api components.
#### Tasks feature - expansion example
	1. Assume we already did the Task feature expansion example on the server side. (: 
	2. 
	
