var Player = function(name) {
	var that = this;
	that.name = name;
};

if ('undefined' !== typeof module && 'exports' in module)
	module.exports = Player;
