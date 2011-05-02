test('Car returns a name.', function () {
	var name = 'me';
	var car = new Car(null, name);

	equal(car.getName(), name, 'No name returned from the car.');
});

test('Car returns the distance travelled.', function () {
	var distance = 100;
	var car = new Car(null, '', distance, 0);

	equal(car.getDistance(), distance, 'No name returned from the car.');
});

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