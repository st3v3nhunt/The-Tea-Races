test('Car returns a name.', function () {
	var fred = 'fred';
	var car = new Car(fred);

	equal(car.getName(), fred, 'Incorrect name returned from the car.');
});

test('2 cars can exist with different names.', function () {
	var fred = 'me';
	var barney = 'barney';
	var carFred = new Car(fred);
	var carBarney = new Car(barney);

	equal(carFred.getName(), fred, 'Incorrect name returned from the car.');
	equal(carBarney.getName(), barney, 'Incorrect name returned from the car.');
});

test('Car returns the distance travelled before race as 0.', function () {
	var car = new Car('');

	equal(car.getDistance(), 0, '0 not returned as the distance travelled before the race.');
});

test('Car Factory creates as many Car objects as names it is provided with - for a single name.', function () {
		var fred = 'fred',
	carFactory = new CarFactory([fred]);

	equal(carFactory.length, 1, 'Single name does not return a single object.');
	deepEqual(carFactory[0], new Car(), 'Single name does not return a single object.');
	equal(carFactory[0].getName(), fred, 'Single name does not return a single object.');
});

test('Car Factory creates as many Car objects as names it is provided with - for several names.', function () {
		var fred = 'fred',
			barney = 'barney',
	carFactory = new CarFactory([fred, barney]);

	equal(carFactory.length, 2, 'Single name does not return a single object.');
	deepEqual(carFactory[0], new Car(), 'Single name does not return a single object.');
	deepEqual(carFactory[1], new Car(), 'Single name does not return a single object.');
	equal(carFactory[0].getName(), fred, 'Single name does not return a single object.');
	equal(carFactory[1].getName(), barney, 'Single name does not return a single object.');
});

/*
test('A single entrant can be registered for a race.', function () {
	var race = new Race();
	var car = new Car();
	var cars = [];
	cars.push(car);
	race.registerEntrants(cars);

	equal(race.getEntrants().length, 1, 'Incorrect number of entrants returned for the race.');
});

test('Multiple entrants can be registered for a race.', function () {
	var race = new Race();
	var car1 = new Car();
	var car2 = new Car();
	var cars = [];
	cars.push(car1);
	cars.push(car2);
	race.registerEntrants(cars);

	equal(race.getEntrants().length, 2, 'Incorrect number of entrants returned for the race.');
});

function dummyCar () {
	var calls = 0;
	this.start = function () {
		calls++;
		if (calls > 1) {
			return true;
		}
	};
	this.stop = function () {};
}

test('Starting the race starts all registered entrants.', function () {
	var race = new Race();
	var car1 = new dummyCar();
	var car2 = new dummyCar();
	var cars = [];
	cars.push(car1);
	cars.push(car2);
	race.registerEntrants(cars);
	race.start();

	ok(car1.start(), 'Car not started when race started.');
	ok(car2.start(), 'Car not started when race started.');
});

test('Race distance is set on Race construction', function () {
	var distance = 1000;
	var race = new Race(distance);
	
	equals(race.getDistance(), distance, 'Race distance is not set on race construction.');
});
*/