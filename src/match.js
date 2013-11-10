var _ = require('underscore');
var Player = require('./player.js');

var NotAPlayerException = function() {};
var TooManyPlayersException = function() {};

var Match = function() {
	var that = this;
	that.players = [];
	that.scoreboard = [];
	that.winner = undefined;
	this.advantagePlayer = undefined;

	var isDeuce = function() {
		return 40 === that.scoreboard[0].points && 40 === that.scoreboard[1].points;
	};

	var isAdvantage = function() {
		return undefined !== that.advantagePlayer;
	};

	var isPlayer = function(p) {
		return p instanceof Player;
	};

	var checkIfPlayer = function(player) {
		if (!isPlayer(player))
			throw new NotAPlayerException();
	};

	Match.prototype.addPlayer = function(p) {
		checkIfPlayer(p);

		if(2 === this.players.length)
			throw new TooManyPlayersException();

		this.players.push(p);
		this.scoreboard.push({
			'name': p.name,
			'points': 0
		});

		return this;
	};

	Match.prototype.addPoint = function(player) {
		checkIfPlayer(player);

		var score = _.find(this.scoreboard, function(s) {
			return s.name === player.name;
		});
		switch(score.points) {
			case 0:
				score.points = 15;
				break;
			case 15:
				score.points = 30;
				break;
			case 30:
				score.points = 40;
				break;
			case 40:
				if (isDeuce()) {
					if (isAdvantage()) {
						if (this.advantagePlayer === player) {
							score.points = 'Game';
							this.winner = player;
						} else {
							this.advantagePlayer = undefined;
						}
					} else {
						this.advantagePlayer = player;
					}
				} else {
					score.points = 'Game';
					this.winner = player;
				}
				break;
		}

		return this;
	};

	Match.prototype.showScoreboard = function() {
		if (undefined === this.advantagePlayer) {
			if (isDeuce()) {
				return Match.DEUCE_STATE;
			} else {
				return this.scoreboard[0].points + ' - ' + this.scoreboard[1].points;
			}
		} else {
			return Match.ADVANTAGE_STATE + ' ' + this.advantagePlayer.name;
		}
	};
};

Match.DEUCE_STATE = 'Deuce';
Match.ADVANTAGE_STATE = 'Advantage';

if ('undefined' !== typeof module && 'exports' in module) {
	module.exports.Match = Match;
	module.exports.NotAPlayerException = NotAPlayerException;
	module.exports.TooManyPlayersException = TooManyPlayersException;
}