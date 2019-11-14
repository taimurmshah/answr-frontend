This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The API can be found here: https://github.com/taishnore/mod-5-back

## Description

Answr is a project I started during the final "module" of the software engineering bootcamp I attended, Flatiron School. The idea of the game was to try to imitate the JackBox.tv game "Quiplash." In that way, Answr is a three-player game in which friends take turns answering prompts and voting on the best answer. 

### Technologies

Answr implements a Ruby on Rails API. On the front-end, I used React and Redux. In order to make the game multiplayer, I implemented Rails' ActionCable and connected it on the front-end via the React-Actioncable-Provider package. 

### Playing the game

The game is not yet deployed; I am still working on the CSS and a few bugs, but here's how the game works:

The game currently consists of nine rounds. With three players, that means that each player is a judge for one set of three prompts, and answers prompts for the other six. The state is managed via Redux... the logic was challenging and fun to figure out. At the end of the game, the results are shown.


The Landing Page: here users can register or login.
![Landing](https://i.imgur.com/tNe4zue.png)

Once logged in, users can either choose to host a new game, or view available games.
![Home](https://i.imgur.com/tsIuyhv.png)

View of available games. These are updated in real time using Action Cable websockets.
![Available Games](https://i.imgur.com/IgspwQo.png)

A user answering a prompt.
![Prompt example 1](https://i.imgur.com/Ke9QYgN.png)

Another example.
![Prompt example 2](https://i.imgur.com/xXAjwzT.png)

The judge votes on answers after each prompt; in the end, each player is shown the results.
![Results](https://i.imgur.com/KfzQzgJ.png)


### Lessons learned
This app was fun to work on. It presented a good combination of challenge and excitement. During bootcamp, I had roughly two weeks to work on this project. A lesson I learned is that a project will take much longer than my optimistic projections. I had originally wanted to make this a 5-8 player game (like Quiplash), but the challenge of coding out the game logic would have taken more time that I had. I also am fairly allergic to CSS (as you can see), and I still have much more styling to take care of. I haven't yet deployed this app because I'm unsatisfied with it, even though I believe that it's complex and impressive as it currently is. Overall, it was fun to work on, and I made many mistakes during it, from which I learned a lot.





