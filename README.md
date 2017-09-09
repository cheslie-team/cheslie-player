cheslie-player
==============

A repository for easy chess-engine writing.


Installation
------------

_If you have trouble installing the player, or just simply don't want to bother with local installation, check out the [cheslie-player JSFiddle](https://jsfiddle.net/63gkjk9j/4/)_

In order to use cheslie-player, you'll need [node.js](https://nodejs.org/en/). [Git](https://git-scm.com/) is nice too.

Simply clone the cheslie-player repo, and install the dependencies by running the commands below.

```
$> git clone https://github.com/cheslie-team/cheslie-player.git
$> cd cheslie-player
$> npm install
```


Usage
-----

When you have installed cheslie-player, you'll probably want to write your own chess player.
The repo is set up so that all engine writing can be done in the `ai.js` file. If you just cloned the repo, it'll contain a sample player, making random moves.

__Testing your player__

To run all unit tests use:

    npm test


You can test your chess player by runnin the command `npm run play` (or `npm run start-win`, if you're using windows). This will play a chess game where your player faces an opponent making random moves.
All moves and positions are printed to the console as shown in the sample listing below.

```
$> npm run play

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


Chess.js and extentions
-----------------------

It is reccomended to use [chess.js](https://github.com/jhlywa/chess.js) to get available moves and to support position evaluation.
Have a look at the chess.js readme for more information about what chess.js can do.

In addition some extentions are prepared as part of cheslie-player:

__.pieces([optional: color])__

Get all pieces on the current board. Accepts an optional color-argument, that can be used to get just the white (`'w'`) or black (`'b'`) pieces.

__.number_of_pieces([optional: color])__

Get the number of pieces on the board. As for `.pieces()` an otional color argument is accepted.


`/modules/chess-extended.js` contains all the extentions.


__.moves_informaton()__

Get all available moves and information of what kind of move this is. Internally `.moves_information()` uses `.moves({ verbose: true })`, so se the chess.js documentation for more information as well.

```
.moves_informaton()
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
