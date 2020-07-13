# Technical decisions & process

### TODO

* [x] Create repo
* [x] Decide on technical selections for application & testing framework
* [x] Bootstrap application with Typescript & Ant design
* [x] Create account for spotify web API / Authentication flow
* [x] Create technical design plan / discuss assumptions made based on brief
* [x] Build application with tests
* [x] Write up learnings & any improvements that I would make with more time


### Assumptions
* Spotify requests happens on key press
* Single user - less concern over rate limiting
* Application should be deployable to multiple environments

### Create repo
Private repo has been created here: https://github.com/Ollie-H/music-venture-code-test. Will update to public once complete.

### Technical decisions

* `Spotify auth flow` - There are multiple options for authorisation the application against spotify, the simplest way to authenticate a user in an OAuth2 flow where the user will be forced to login to spotify. The main reason for this selection over app auth is that we would require storing a sensitive key in a client application or moving to a server solution. I will then look to store this key in local storage and store in context to allow hooks to have access to key in sub components.
* `React framework` - nextjs or CRA would be the obvious choices for quickly bootstrapping this application. Next JS is packaged with far more untilities for SSR and routing but will introduce a node server dependency and more complexity. Given the need for a fast solution here based on the brief, CRA will serve better in this use case.
* `Testing framework` - I have decided to use react test renderer over enzyme. Test renderer is more geared towards testing the behaviour rather than the implementation and given the excercise will not contain e2e tests. This will give me much more confidence that the user requirements are being met.
* `Data fetching` - Given the fairly simple requirement on data fetching here (two GET requests) I have opted to go for a simple http client over apollo (or similar). The one requirement I can see here is around rate limiting if my assumption on fast search is correct, therefore deboucing and request cancellation would be needed. Ordinarily [SWR](https://github.com/vercel/swr) would be the obvious selection here but in order to demonstrate the code I will use a mixture of [Axios](https://github.com/axios/axios) and react hooks.
* `Routing` - I have opted to move most state regarding search and page selection to the URL as opposed to a state management solution, the benefits we get here are decoupled components from state and ability to deep link to tracks as requirements change.


### Learnings

* The auth flow took a little longer than expected due to some assumptions over token expiry and attempting to use the wrong token type.
* A knows issue, but one that came up was that testing asyncronouse hooks outside of components is fairly unpredictable. If given more time I would look to improve these and try to cover more behaviour around loading/loaded/error.
* Typing a complex API from response isn't ideal, the SDK [https://github.com/spotify/web-api](https://github.com/spotify/web-api) looks like it abstracts a lot of access layer away and also has a definetly typed package that appears up to date with type defs.
* As previously stated in a real world application I would have looked to use an open source solution such as SWR for data fetching, as some of the complexities could have been better served improving look and feel rather than reinventing the wheel. I also ran out of the time to look at rate limiting measures such as cache and cancellation which would have been handled by SWR.


### What I would improve on

* CI/CD - I would look to dockerise the application with either a node server or an niginx proxy to allow the application to be deployable to any docker env and allow the routes to work once deployed.
* Re-evaluate data fetching approach and validate open source, fully featured alternatives such as SWR. This would allow features such as cache and request cancellation out of the box.
* Improve test coverage - I have looked to cover the most important areas as unit tests, but the integration between spotify is untested so some kind of e2e tests covering behaviour would improve confidence. Edge/fail cases are also fairly untested so would look to spend some time there looking at that.
* Improve UI fidelity - I have mainly used the out of the box antd components which I hadn't used before, so I would want to spend a bit more time learning how to theme and improve spacing consistency.