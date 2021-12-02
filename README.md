# simple chat application

some notes

- i chose next js for bootstraping because it is very simple as well as well prepared configuration
- apollo-client for http request
- linter is combine between default eslint and little prettier
- for state management, use some internal hooks as reducer as well as context

- for project structure
  - common folder will hold everything which are shared on the whole application
  - graphql folder will take responbility to init graphql object
  - modules, in the other hand will hold the code which is belonging to it - including its state. in this application is menu, list, and input
  - for some application state it will be located at highest level to reuse by Context API. in this situation, is use, channel, which will be notified once user select another data
  - most of components are writing by functional way with logic extract into hooks to easy reuse the logic, upgrade ui as well as testing later
