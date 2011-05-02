(function () {
window['Page'] = function Page () {
	var self = this,
	 $canvas = $('#canvas')[0],
	$context = $canvas.getContext('2d');

	this.setCanvasSize = function () {
		height = $(document).height();
		width = $(document).width();
		$canvas.height = height-2;
		$canvas.width = width-2;
	};
};

window['Car'] = function Car (name) {
	var self = this,
	 timerId = 0,
				 x = 0,
				 y = 0,
			name = name;

	this.getName = function () { return name; };

	this.getDistance = function () { return x; };

	this.getStartPosition = function () { return y; };
	
	this.setStartPosition = function (value) { y = value; };

	this.start = function () {
		timerId = setInterval( function () {
								x = x+Math.floor(Math.random()*3+1);
							}, 10);
	};

	this.stop = function () {
		clearInterval(timerId);
	};
};

window['Race'] = function Race (canvas) {
		var self = this,
		entrants = [],
			canvas = canvas,
				 ctx = canvas.getContext('2d'),
raceDuration = (ctx.canvas.width - 100 / 2) * 5;

	drawRace = function () {
		for (var i=0;i<entrants.length;i++) {
			ctx.fillRect(entrants[i].getDistance(),entrants[i].getStartPosition(),10,10);
		}
	};
	
	clearRace = function () {
		ctx.clearRect(0,0,$(document).width(), $(document).height());
	};

	this.getDistance = function () { return distance; };

	this.getEntrants = function () { return entrants; };

	this.registerEntrants = function (cars) {
		for (var i=0; i<cars.length; i++) {
			entrants.push(cars[i]);
		}
	};

	this.start = function () {
		var startingLocation = 0;
		for (var i=0;i < entrants.length; i++) {
			entrants[i].setStartPosition(startingLocation+=50);
			entrants[i].start();
		}
		setInterval(function () {
			clearRace();
			drawRace();
			}, 10);
		setTimeout(stop, raceDuration);
	};

	declareWinnner = function () {
		var winner = { name: '', distance: 0, draw: false };
		for (var i=0;i < entrants.length; i++) {
			var entrantDistance = entrants[i].getDistance();
			if (entrantDistance > winner.distance) {
				winner.name = entrants[i].getName();
			} else if (entrantDistance === winner.distance) {
				winner.name = 'DRAW!';
			}
			winner.distance = entrantDistance;
		}
		console.log('The winner is: ' + winner.name + ' with a distance of: ' + winner.distance);
	};

	stop = function () {
		for (var i=0;i < entrants.length; i++) {
			entrants[i].stop();
		}
		declareWinnner();
	};
};
})();

$(document).ready(function () {
	var page = new Page(),
			 car = new Car('me'),
			car2 = new Car('you'),
			car3 = new Car('them'),
			cars = [car, car2, car3],
	 $canvas = $('#canvas')[0];

	page.setCanvasSize()

	var race = new Race($canvas);
	race.registerEntrants(cars);
	race.start();
});