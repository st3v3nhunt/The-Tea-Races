function Page () {
	var self = this,
	 $canvas = $('#canvas')[0],
	$context = $canvas.getContext('2d');
	
	this.getContext = function () {
		return $context;
	};

	this.draw = function (x) {
		var context = $context;
		context.fillRect(100,100,100,100);
	};

	this.clearCanvas = function () {
		var width = $context.canvas.width;
		var height = $context.canvas.height;
		$context.clearRect(0,0,width,height);
	};

};

function Car (context, x, y) {
	var self = this,
	 timerId = 0,
			 ctx = context,
		xStart = x,
		yStart = y,
				 x = x,
				 y = y;

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
								x = x+Math.ceil(Math.random()*2);
							}, 10);
	};
	
	this.stop = function () {
		clearInterval(timerId);
	};

};

function Race () {
	var self = this,
	entrants = [];

	this.register = function (car) {
		entrants.push(car);
	};

	this.start = function () {
		var i = 0;
		for (i=0;i < entrants.length; i++) {
			entrants[i].start();
		}
	};

	this.stop = function () {
		var i = 0;
		for (i=0;i < entrants.length; i++) {
			entrants[i].stop();
		}
	};
};

$(document).ready(function () {
	var page = new Page();
	var car = new Car(page.getContext(), 50, 50);
	var car2 = new Car(page.getContext(), 50, 150);
	var car3 = new Car(page.getContext(), 50, 250);
	
	//car.start();
	
	var race = new Race();
	race.register(car);
	race.register(car2);
	race.register(car3);
	
	race.start();
	setTimeout(race.stop, 6000);


});
