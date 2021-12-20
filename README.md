# Sonara Says challenge

Hi! Thanks for your interest in working at Sonara Health :-)

We really appreciate you taking the time to work on this coding challenge for
us. We expect it to take no longer than 1-2 hours, and although you should feel
free to work on it as much as you'd like, you should also feel no pressure or
obligation to work more than that amount, even if your work is incomplete. We
will continue to work on it in the interview.

## The task

The task is to build the memory game
[Simon](<https://en.wikipedia.org/wiki/Simon_(game)>) in React.

Here are the requirements:

- The game should not start until a "start game" button is pressed, after which
  the game starts immediately on Sonara's turn, with a "sequence" consisting of
  a single random button.
- On Sonara's turn, the sequence of buttons thus far is shown (the buttons
  should flash in order). As soon as the last button of the sequence is shown,
  it switches to the player's turn.
- On the player's turn, they must press the buttons in the same sequence as was
  shown. If a button is pressed out of order, the game ends and returns to the
  initial state. If all buttons in the sequence are pressed correctly, a random
  new button gets added to the end of the sequence, and it switches back to
  Sonara's turn.
- There should be some indication of whose turn it is.

Please see a screencast of a possible final product here:
https://drive.google.com/file/d/1xxhHU9fIJJaw3K9ZJUEbMVmmQ-6pVEDJ/view

As far as the final project goes:

- Please use best practices as much as possible. Code should be written using
  hooks, not React classes, and should be split naturally at component
  boundaries
- Tests are not required
- Before sending it off, please document any known bugs, code you might have
  wished turned out better, or any general thoughts on the challenge (if you
  have any)
- Finally, zip everything up (**do not include the node_modules folder!!!!**),
  and send it back to us.

We will go over the code and continue working on it together in a follow-up
call.

Good luck and have fun! Don't hesitate to reach out if you have any questions.

# Create React App

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

To get started, make sure you have
[`yarn` installed](https://classic.yarnpkg.com/lang/en/docs/install/). Then, run
`yarn` in this project's root directory to install all dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.
