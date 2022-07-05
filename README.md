# nicolas-tudela
Personal Site. It was created to use it as a portfolio and opportunity to research about new technologies. 


# Live site
https://www.nicolastudela.dev/

The site will mainly provide information about myself, my work experience and some sort of blog, where users can post something.

**The project is still on its early stage** 

Mutable data, users, and auth flows are be handled by an API (built by me)  -> https://github.com/nicolastudela/solari

## Responsive desing supporting 2 breakpoints

The site responds well to several resolutions but for sake of simplicity it was build to support two main layouts mobile & non-mobile. 

see [useMediaQuery](src/components/utils/useMediaQuery) 

## Tech/framework used

<b>Technologies & Frameworks</b>
- [React.js](https://reactjs.org/) (Hooks)
- [Babel 7](https://babeljs.io/)
- [Webpack 4] 
- [React-Router v4]
- [Emotion.js]
- [Material.UI]
- [SmoothUI]
- [Apollo Client]

<b>[Reusable custom logic/functionality](src/components/utils)</b>
- [useScrollTrigger](src/components/utils/useScrollTrigger)
  It can be used to being notified whenever the user scrolls given element (default window)
- [ScrollToTop](src/components/utils/ScrollToTop)
  <ScrollToTop> component that will scroll the window up on every navigation
- [useMediaQuery](src/components/utils/useMediaQuery)
  Adaptation of Material's useMediaQuery hook to detect if document matches mobile/non-mobile media-queries 
- [useLoggedUser](src/components/utils/useLoggedUser)
  It provides user auth functions (signin/signout) and the logged user. Also provides a loading-flag indicating that an action related to the user is being performed
- [useFormControl](src/components/utils/useFormControl)
  Custom form validation. Non-intrusive form validation-state-control that allows to place custom validations and sanitize functions (convert from string values to wathever you like) on form fields.

## IMPLEMENTATION PLAN

### Layout and pages implemented Home / About / Resume / Contact  (V1)

- Home | About | Contact pages will only show pretty much static data
- Resume page: Will need to fetch data from the API [api.nicolastudela.com] 

### Basic admin functionality  (V2)

- Implement an admin page, where basically can be used to run some actions/mutations through the API.  
- Let the admin user to mutate data related to the resume. 
- Let the admin setup the spotify signin access 

### Showing my spotify and instagram feed   (V3)

- The api will handle to get the token/refresh tokens and the but the instagram data will be fetch in clientside
- This data is going to be provided by the API. Will show Top Artists and Tracks with their pics. 

### Let the users to listen my some of my favourite songs/tracks/lists/artists (V4)

- Gives the option to the user to hover the Top Artis and Tracks of my spotfy feed and reproducing the tracks using https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
- It will need require users to signin through spotify auth  


### Users can singup/signin and post notes (V5)


## Deploy to Prod

To deploy to prod, only you just have to run `now` on your local folder. Later you will have to configure an alias for the lattest 
deploy.


## Tests
* npm run test

It uses
* Jest 
* React-testing-library

## How to use?
* npm run start - will start the dev-server /hot-reload (localhost:3000)
* npm run build - build 
* now dev - install local-lambda runs it locally altogether with hot-load support -> localhost (localhost:3000) (


MIT © [Nicolas Tudela]()
