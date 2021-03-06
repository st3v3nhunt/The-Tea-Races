window.log = function(){
  log.history = log.history || [];  
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

(function () {
window.CarFactory = function CarFactory (names) {
	var cars = [];
	for (var i=0; i<names.length; i++) {
		cars.push(new Car(names[i]));
	}
	return cars;
};

window.Car = function Car (name) {
	var self = this,
				 x = 0,
				 y = 0,
	 timerId = 0,
	 carName = name;

	function move () {
			x += Math.floor(Math.random() * 3+1);
	}

	this.getName = function () { return carName; };

	this.getDistance = function () { return x; };

	this.getStartPosition = function () { return y; };

	this.setStartPosition = function (X, Y) { x = X; y = Y; };

	this.start = function () {
		timerId = setInterval( move, 10);
	};

	this.stop = function () {
		clearInterval(timerId);
	};
};

window.Race = function Race (canvas) {
			var self = this,
			entrants = [],
		 raceTimer = 0,
 startPosition = 50,
					 ctx = canvas.getContext('2d');

	function getFinishLine () {
		return ctx.canvas.width - 50;
	}

	function drawLine (name, position) {
		ctx.moveTo(position + 0.5, 15);
		ctx.lineTo(position + 0.5, ctx.canvas.height);
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.font = 'bold 10px sans-serif';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'center';
		ctx.fillText(name, position, 0);
	}

	function setupRaceTrack () {
		drawLine('Start', startPosition);
		drawLine('Finish', getFinishLine());
	}

	function drawRaceTrack () {
		for (var i=0; i<entrants.length; i++) {
			ctx.fillRect(entrants[i].getDistance(),entrants[i].getStartPosition(),10,10);
		}
	}

	function clearRaceTrack () {
		ctx.clearRect(startPosition,15,getFinishLine() - startPosition, ctx.canvas.height - 15);
	}

	function declareWinnner () {
		var winner = { name: '', distance: 0 };
		for (var i=0; i<entrants.length; i++) {
			var entrantDistance = entrants[i].getDistance();
			if (entrantDistance > winner.distance) {
				winner.name = entrants[i].getName();
				winner.distance = entrantDistance;
			} else if (entrantDistance === winner.distance) {
				winner.name = 'DRAW!';
				winner.distance = entrantDistance;
			}
		}
		console.log('The winner is: ' + winner.name + ' with a distance of: ' + winner.distance);
	}

	function stopRace () {
		for (var i=0; i<entrants.length; i++) {
			entrants[i].stop();
		}
		clearInterval(raceTimer);
		declareWinnner();
	}

	function checkRaceStatus () {
		for (var i=0; i<entrants.length; i++) {
			if (entrants[i].getDistance() >= getFinishLine()) {
				stopRace();
			}
		}
	}

	this.getEntrants = function () { return entrants; };

	this.registerEntrants = function (cars) {
		for (var i=0; i<cars.length; i++) {
			entrants.push(cars[i]);
		}
	};

	this.startRace = function () {
		var startingLocation = 0;
		for (var i=0; i<entrants.length; i++) {
			entrants[i].setStartPosition(startPosition, startingLocation+=50);
			entrants[i].start();
		}
		setupRaceTrack();
		raceTimer = setInterval(function () {
			clearRaceTrack();
			drawRaceTrack();
			checkRaceStatus();
			}, 10);
	};
};

window.Venue = function Venue (names) {
	setCanvasDimensions();

	var cars = new CarFactory(names),
	 $canvas = $('#canvas').get(0),
			race = new Race($canvas);

	race.registerEntrants(cars);
	race.startRace();
};

function setCanvasDimensions () {
	var height = $(document).height(),
			 width = $(document).width(),
		 $canvas = $('#canvas')[0];
	$canvas.height = height-2;
	$canvas.width = width-2;
}
})();