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

	this.getContext = function () {
		return $context;
	};
};

window['Car'] = function Car (context, name, x, y) {
	var self = this,
	 timerId = 0,
			 ctx = context,
		xStart = x,
		yStart = y,
				 x = x,
				 y = y,
			name = name;

	this.getName = function () { return name; };

	this.getDistance = function () { return x; };

	this.drawCar = function () {
		ctx.fillRect(x,y,10,10);
	};

	this.clearCar = function () {
		ctx.clearRect(xStart,yStart,10+x,10+y);
	};

	this.start = function () {
		timerId = setInterval( function () {
								self.clearCar();
								self.drawCar();
								x = x+Math.floor(Math.random()*3+1);
							}, 10);
	};

	this.stop = function () {
		clearInterval(timerId);
	};
};

window['Race'] = function Race () {
	var self = this,
	entrants = [],
	duration = ($(document).width() - 100 / 2) * 5;
	
	this.getEntrants = function () { return entrants; };

	this.registerEntrants = function (cars) {
		for (var i=0; i<cars.length; i++) {
			entrants.push(cars[i]);
		}
	};

	this.start = function () {
		for (var i=0;i < entrants.length; i++) {
			entrants[i].start();
		}
		setTimeout(stop, duration);
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
	var page = new Page();
	page.setCanvasSize();

	var car = new Car(page.getContext(), 'me', 50, 50);
	var car2 = new Car(page.getContext(), 'you', 50, 150);
	var car3 = new Car(page.getContext(), 'them', 50, 250);
	var cars = [car, car2, car3];

	var race = new Race();
	race.registerEntrants(cars);
	race.start();
});