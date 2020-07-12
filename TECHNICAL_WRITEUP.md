# Technical decisions & process

### TODO

* [x] Create repo
* [x] Decide on technical selections for application & testing framework
* [x] Bootstrap application with Typescript & Ant design
* [ ] Create account for spotify web API
* [ ] Create technical design plan / discuss assumptions made based on brief
* [ ] Build application with tests
* [ ] Write up learnings & any improvements that I would make with more time


### Assumptions
* Spotify requests happens on key press
* Application should be deployable to multiple environments
*   We will need a way to set the API key for each environment (Maybe OOS for this brief)

### Create repo
Private repo has been created here: https://github.com/Ollie-H/music-venture-code-test. Will update to public once complete.

### Decide on technical selections for react application & testing strategy

* `React framework` - nextjs or CRA would be the obvious choices for quickly bootstrapping this application. Next JS is packaged with far more untilities for SSR and routing but will introduce a node server dependency and more complexity. Given the need for a fast solution here based on the brief, CRA will serve better in this use case.
* `Testing framework` - I have decided to use react test renderer over enzyme. Test renderer is more geared towards testing the behaviour rather than the implementation and given the excercise will not contain e2e tests. This will give me much more confidence that the user requirements are being met.
* `Data fetching` - Given the fairly simple requirement on data fetching here (two GET requests) I have opted to go for a simple http client over apollo (or similar). The one requirement I can see here is around rate limiting if my assumption on fast search is correct, therefore deboucing and request cancellation would be needed. Ordinarily [SWR](https://github.com/vercel/swr) would be the obvious selection here but in order to demonstrate the code I will use a mixture of [Axios](https://github.com/axios/axios) and react hooks.


### Rate Limiting

Spotify web API has rate limits in place for it's endpoints and recommmends certain patterns for requesting data. Namely batching ie get all tracks for an artist instead of selecting a speficic track by ID. In memory cache could also be used here to prevent over fetching on certain actions, and given the fairly static nature of the data it would be fairly row risk in terms of data freshness.

There is also information in the documentation that a header will be sent back with information on when rate limit will be allowed again so that should be factored into the request as well.