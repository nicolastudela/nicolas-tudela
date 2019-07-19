# nicolas-tudela
Personal Site. It was created to use it as a portfolio and opportunity to try and research about new technologies. 

The site will mainly provide information about myself, my work experience and some sort of blog, where users can post something.

**The project is still on its early stage** 

Data about resume and users flow will be handled by hitting an API that also on constrution -> https://github.com/nicolastudela/solari

## Tech/framework used

<b>Built with</b>
- [React.js](https://reactjs.org/) (Hooks)
- [Babel 7](https://babeljs.io/)
- [Webpack 4] 
- [React-Router]
- [Emotion.js]
- [Material.UI]
- [SmoothUI]



## Next Steps

- Need to define what architecture to use in terms of state management. I'd would try something differnt than any flux-like (redux) solutions; I might try apollo-client or just coding some vanilla implementation (with hooks). Apollo-Client might be a little bit overkill. But it can 
be a good way to tackle api calls and also state management. TBD


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
// TODO: No tests yet, I think I will test the app using Jest, since I already know it workl :(

## How to use?
* npm run start - will start the dev-server /hot-reload (localhost:3000)
* npm run build - build 
* now dev - install local-lambda runs it locally altogether with hot-load support -> localhost (localhost:3000) (


MIT © [Yourname]()
