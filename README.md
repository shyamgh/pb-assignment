## pb-assignment

Clone this repository to your local machine. \
Pre-requisite - Node.js, Playwright is setup on local machine. Which is also mentioned in package.json dependency. So expected is playwright is initialized and setup. \

Once repository is cloned, run below command frm repository directory. \

npm install

## Command to run new user card registration test:

#### Option 1: Run using playwright
##### Headless run for Germany website:
LOCALE=at npx playwright test

##### Headed run for both Germany and Italian website:
LOCALE=at npx playwright test --headed \
LOCALE=it npx playwright test --headed 

#### Option 2: It is possible to run script using npm, as it is included in package.json 'script' block, 'at' for Germany and 'it' for Italian website
npm run test-headless-at \
npm run test-headed-at \
npm run test-headed-it

![image](https://user-images.githubusercontent.com/15071419/187476634-eaef2973-03f8-4dd2-b5a7-12783581156f.png)
