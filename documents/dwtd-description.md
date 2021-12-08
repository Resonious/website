(Update: 2021-12-08)
Everytime I look back at this project I'm so impressed with myself. I don't think any of my following projects come even close to topping it. The game is simple to figure out, reasonably deep, has consistent visuals. The music is actually pre-composed royalty-free clips haphazardly spliced together and pitch-shifted but it fits so well. Also the code is just one massive main.cpp file with almost no classes.

(Original post: 2017-12-18)
My entry for Ludum Dare 33. The theme for that LD was "You are the Monster", which I had
a hard time working with. I came up with the idea of having an enemy that mimicks the player's
behavior somehow, which I thought was a neat, somewhat literal interpretation of
"You are the Monster".

I figured if I was going to base the game off of enemy behavior,
I'd need to have a reasonably complex combat system. I came up with something that's vaguely
similar to Crypt of The NecroDancer, except with a sidescroller view (and the camera does
not move). Pressing an arrow key moves the character one cell in the specified direction. The "up"
direction does somewhat of a jump where the character moves up one cell, and then down one cell after
a delay. When the player jumps, and then presses the left or right arrow key while still in the air,
they perform a downward slash in that direction. Pressing the down button blocks incoming attacks.

The goal of the game is to move onto your opponent's cell. When each player moves onto each other's
cell simultaneously, it's a "clash" and no movement happens. It's a weird system, but surprisingly
easy to get the hang of. I did eventually create a boss enemy that behaves differently based on
the player's actions during the first several fights, but it was honestly not obvious at all, so
nobody really understood the connection between this game and the theme. Nevertheless, the game
ranked number 36 in "fun" and 58 in "overall".
