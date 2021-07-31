## Code Review Criteria

When submitting a PR into the Eureka repo, this will be the criteria used to approve your code:

### Implementation

-   Meets all Functional Requirements (if they exist)
-   Can this solution be simplified or improved?
-   Use of Eureka practices like TypeScript, scoped scss & Composition API
-   Are the static styles stored as scss variables?
-   Is it UI mobile responsive?
-   Strict equality check (===) instead of loose equality check (==)
-   Are any inputs used validated correctly?
-   Does the solution use proper use of API calls?
-   Does it use Font Awesome for icons? SVGs can be used in the case a Font Awesome icon can't be used.
-   Is there any duplication of code or functionality?
-   Was a framework, API, library, service used that should not be used?
-   Was a framework, API, library, service not used that could improve the solution?
-   Would you have solved the problem in a different way that is substantially better in terms of the code’s maintainability, readability, performance, security?

### Error Handling and Logging

-   Is error handling done the correct way?
-   Should any logging or debugging information be added or removed?
-   Are error messages user-friendly?

### Readability

-   Good use of comments and documentation
-   Are you able to understand the code easily?
-   Is there any commented out code?
-   Are good coding standards & practices followed?

### Important Considerations

-   Does this code open the software for security vulnerabilities?
-   Are authorization and authentication handled in the right way?
-   Does this code change reveal some secret information (like keys, usernames, etc.)?
-   Is data retrieved from external APIs or libraries checked accordingly?
