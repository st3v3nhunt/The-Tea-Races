(function () {
	window.Page = function Page () {
		var $racers = $('#racers');

		function addNameBoxes () {
			var values = getEntrantNames(),
				entrants = parseInt($racers.val()),
	 entrantInputs = '',
					 value = '';

			$('.entrants').remove();
			for (var i=0; i<entrants; i++) {
				value = values[i] === undefined ? 'entrant'+(i+1) : values[i];
				entrantInputs += '<input id="entrant'+ i +'" class="entrants" type="text" value="'+ value +'"></input>';
			}
			$('#form').append(entrantInputs);
		};

		function getEntrantNames () {
			var values = [];
			$('.entrants').each(function () {
				values.push($(this).val());
			});
			return values;
		};

		this.setup = function () {
			$racers.change(addNameBoxes);
			$('#demo').click(function startDemoRace () { new Venue(['me', 'you', 'them', 'us']); });
			$('#start').click(function () {
				var entrants = getEntrantNames();
				if (entrants.length < 1) {
					console.log('You need to pick at least one racer!');
				} else {
					new Venue(entrants);
				}
			});
		};
	};
})();

$(document).ready(function () {
	new Page().setup();
});