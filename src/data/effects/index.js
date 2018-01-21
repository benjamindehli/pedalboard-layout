const effectsByManufacturer = [
{name: 'Boss', effects: require("./boss.json")},
{name: 'Dallas Arbiter', effects: require("./dallas-arbiter.json")},
{name: 'Diamond', effects: require("./diamond.json")},
{name: 'Digitech', effects: require("./digitech.json")},
{name: 'Electro-Harmonix', effects: require("./electro-harmonix.json")},
{name: 'Fender', effects: require("./fender.json")},
{name: 'Kingsley', effects: require("./kingsley.json")},
{name: 'Mojo Hand FX', effects: require("./mojo-hand-fx.json")},
{name: 'Neo Instruments', effects: require("./neo-instruments.json")},
{name: 'Origin Effects', effects: require("./origin-effects.json")},
{name: 'Roger Mayer', effects: require("./roger-mayer.json")},
{name: 'VanAmps', effects: require("./van-amps.json")},
{name: 'Xotic', effects: require("./xotic.json")}
];

const effectManufacturers = [];
const effects = [];

effectsByManufacturer.forEach(function (manufacturer){
	effectManufacturers.push(manufacturer.name);
	effects.push.apply(effects, manufacturer.effects);
	console.log(manufacturer.effects);
});

export default {effectManufacturers: effectManufacturers, effects: effects};
