cheslie-player
==============

A repository for easy chess-engine writing.


Installation
------------

_If you have trouble installing the player, or just simply don't want to bother with local installation, check out the [cheslie-player JSFiddle](https://jsfiddle.net/63gkjk9j/7/)_

In order to use cheslie-player, you'll need [node.js](https://nodejs.org/en/). [Git](https://git-scm.com/) is nice too.

Simply clone the cheslie-player repo, and install the dependencies by running the commands below.

```
$> git clone https://github.com/cheslie-team/cheslie-player.git
$> cd cheslie-player
$> npm install
```

Workshop wiki
-------------

The best place to get started with writing your own chess AI using cheslie-player is the [workshop wiki](https://github.com/cheslie-team/cheslie-player/wiki). Basic usage is shown below, but the wiki contains a lot more information, including a more detailed getting started guide.


Usage
-----

When you have installed cheslie-player, you'll probably want to write your own chess AI.
The repo is set up so that all engine writing can be done in the `ai.js` file. If you just cloned the repo, it'll contain a sample player, making random moves.

__Testing your player__

To run all unit tests use:

    npm test

The unit tests won't do anything terribly interesting, but they'll check that your AI is capable of making leagal chess moves.

You can test your chess AI more extensively by runnin the command `npm start`. This will play a chess game where your AI faces an opponent making random moves. All moves and positions are printed to the console as shown in the sample listing below.

```
$> npm start

> node scripts/play-random.js

   +------------------------+
 8 | ♜  ♞  ♝  ♛  ♚  ♝  ♞  ♜ |
 7 | ♟  ♟  ♟  ♟  ♟  ♟  ♟  ♟ |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  .  .  . |
 4 | .  .  .  .  .  .  .  . |
 3 | .  .  .  .  .  .  ♙  . |
 2 | ♙  ♙  ♙  ♙  ♙  ♙  .  ♙ |
 1 | ♖  ♘  ♗  ♕  ♔  ♗  ♘  ♖ |
   +------------------------+
     a  ♝  c  d  e  f  g  h

 ♔ = White, ♚ = Black

[A lot of frames is omitted here]

 ♔ = White, ♚ = Black
   +------------------------+
 8 | .  .  .  .  .  .  .  . |
 7 | .  .  .  .  .  .  .  ♚ |
 6 | .  .  .  .  .  .  .  . |
 5 | .  .  .  .  .  ♝  .  ♔ |
 4 | .  .  .  .  .  .  ♜  . |
 3 | .  .  .  .  .  .  ♞  . |
 2 | ♞  .  .  .  .  .  .  . |
 1 | .  .  .  .  .  .  .  . |
   +------------------------+
     a  ♝  c  d  e  f  g  h

 ♔ = White, ♚ = Black
Black won by checkmate
$>
```

If you're running locally, you can also try out the command `npm run dev-browser` to get a visualization of your AI playing a game in the browser.

__Playing against other opponents__

When you're confident that your player can beat any other ai out there, you can start the player and join the tournament server with the command `npm run tournament` (or `npm run tournament-win`, if you're using windows).
This will connect your AI to a game and tournament server, and should produce an output similar to the listing below.

```
$> npm tournament

> NODE_ENV=production node player.js

Player Tørrfisk - 359 is connected to cheslie-tourney
Player Tørrfisk - 359 is connected to cheslie-game


```

You can visit [cheslie-tourney.azurewebsites.net](http://cheslie-tourney.azurewebsites.net/) and to follow the tournament in progress.


Chess.js and extentions
-----------------------

It is reccomended to use [chess.js](https://github.com/jhlywa/chess.js) to get available moves and to support position evaluation.
Have a look at the chess.js readme for more information about what chess.js can do.

In addition some extentions are prepared as part of cheslie-player:

__.pieces([optional: color])__

Get all pieces on the current board. Accepts an optional color-argument that can be used to get just the white (`'w'`) or black (`'b'`) pieces.

__.numberOfPieces([optional: color])__

Get the number of pieces on the board. As for `.pieces()` an optional color argument is accepted.


`/modules/chess-extended.js` contains all the extentions.


__.movesInformation()__

Get all available moves and information of what kind of move this is. Internally `.movesInformation()` uses `.moves({ verbose: true })`, so se the chess.js documentation for more information.

```
.movesInformation()
chess.moves({ verbose: true });
// -> [{ color: 'w', from: 'a2', to: 'a3',
//       flags: 'n', piece: 'p', san 'a3'
//       # a captured: key is included when the move is a capture
//       # a promotion: key is included when the move is a promotion
//     },
//     ...
//     ]
```

The piece, captured, and promotion fields contain the lowercase representation of the applicable piece.

The flags field in verbose mode may contain one or more of the following values:

* 'n' - a non-capture
* 'b' - a pawn push of two squares
* 'e' - an en passant capture
* 'c' - a standard capture
* 'p' - a promotion
* 'k' - kingside castling
* 'q' - queenside castling

A flag of 'pc' would mean that a pawn captured a piece on the 8th rank and promoted.


Sample players and Modules
--------------------------

Some sample players are available in the `/sample-players` folder. All support the `.move(board)` construct, so you can use them directly in your own ai.js code.

The sample players use different modules pre-prepared for easy chess-engine development. They are located under the `/modules` folder.
