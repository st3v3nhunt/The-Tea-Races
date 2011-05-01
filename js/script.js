(function () {
function Page () {
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

	this.clearCanvas = function () {
		var width = $context.canvas.width;
		var height = $context.canvas.height;
		$context.clearRect(0,0,width,height);
	};

};

function Car (context, name, x, y) {
	var self = this,
	 timerId = 0,
			 ctx = context,
		xStart = x,
		yStart = y;

	this.x = x;
	this.y = y;
	this.name = name;

	this.getDistance = function () { return this.x; };

	this.drawCar = function () {
		ctx.fillRect(this.x,this.y,10,10);
	};

	this.clearCar = function () {
		ctx.clearRect(xStart,yStart,10+this.x,10+y);
	};

	this.start = function () {
		timerId = setInterval( function () {
								self.clearCar();
								self.drawCar();
								self.x = self.x+Math.floor(Math.random()*3+1);
							}, 10);
	};
	
	this.stop = function () {
		clearInterval(timerId);
	};

};

function Race () {
	var self = this,
	entrants = [],
	duration = ($(document).width() - 100 / 2) * 5;

	this.registerCars = function (cars) {
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
		var winner = { name: '', distance: 0 };
		for (var i=0;i < entrants.length; i++) {
			var entrantDistance = entrants[i].getDistance();
			if (entrantDistance > winner.distance) {
				winner.distance = entrantDistance;
				winner.name = entrants[i].name;
			}
		}
	};

	stop = function () {
		for (var i=0;i < entrants.length; i++) {
			entrants[i].stop();
		}
		declareWinnner();
	};
};

$(document).ready(function () {
	var page = new Page();
	page.setCanvasSize();

	var car = new Car(page.getContext(), 'me', 50, 50);
	var car2 = new Car(page.getContext(), 'you', 50, 150);
	var car3 = new Car(page.getContext(), 'them', 50, 250);
	var cars = [car, car2, car3];

	var race = new Race();
	race.registerCars(cars);

	race.start();

});
})();