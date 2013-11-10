var expect = require('expect.js');
var Player = require('../src/player.js');
var m = require('../src/match.js');
var Match = m.Match;
var NotAPlayerException = m.NotAPlayerException;
var TooManyPlayersException = m.TooManyPlayersException;

describe('Player Tests', function() {
	describe('There should be players', function() {
		it('Create player', function() {
			var player = new Player('Nani Boy');
			expect(player.name).to.be('Nani Boy');
		});
	});
});

describe('Match tests', function() {
	var match, p1, p2;
	beforeEach(function() {
		match = new Match();
		p1 = new Player('Nani Boy');
		p2 = new Player('Triki');
	});
	describe('A match should have two players', function() {
		it('Add two players', function() {
			match.addPlayer(p1).addPlayer(p2);
			expect(match.players.length).to.be(2);
		});
	});
	describe('A match should throw a NotAPlayerException when adding not a Player', function() {
		it('Add not a player', function() {
			expect(function() {
				match.addPlayer(1);
			}).to.throwException(function(e) {
				expect(e).to.be.a(NotAPlayerException);
			});
		});
	});
	describe('Add a third player should throw an TooManyPlayersException', function() {
		it('Add a third player and it should crash', function() {
			expect(function() {
				match.addPlayer(p1).addPlayer(p2).addPlayer(new Player('Peggy Pork'));
			}).to.throwException(function(e) {
				expect(e).to.be.a(TooManyPlayersException);
			});
		});
	});
	describe('Add a point to one player', function() {
		it('Add a point', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1);
			expect(match.showScoreboard()).to.be('15 - 0');
		});
	});
	describe('Match must have a winner', function() {
		it('Add points till winner', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1).addPoint(p1).addPoint(p1).addPoint(p1);
			expect(match.winner).to.be(p1);
		});
	});
	describe('Deuce', function() {
		it('Prints Deuce', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1).addPoint(p1).addPoint(p1)
				.addPoint(p2).addPoint(p2).addPoint(p2);
			expect(match.showScoreboard()).to.be(Match.DEUCE_STATE);
		});
		it('Advantage Player 2', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1).addPoint(p1).addPoint(p1)
				.addPoint(p2).addPoint(p2).addPoint(p2).addPoint(p2);
			expect(match.showScoreboard()).to.be('Advantage ' + p2.name);
		});
		it('Deuce after Advantage Player 2', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1).addPoint(p1).addPoint(p1)
				.addPoint(p2).addPoint(p2).addPoint(p2).addPoint(p2)
				.addPoint(p1);
			expect(match.showScoreboard()).to.be(Match.DEUCE_STATE);
		});
		it('Advantage Player 1 after second Deuce', function() {
			match.addPlayer(p1).addPlayer(p2);
			match.addPoint(p1).addPoint(p1).addPoint(p1)
				.addPoint(p2).addPoint(p2).addPoint(p2).addPoint(p2)
				.addPoint(p1).addPoint(p1);
			expect(match.showScoreboard()).to.be('Advantage ' + p1.name);
		});
	});
});