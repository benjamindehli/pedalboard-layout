export default {
	effects(state) {
		return state.effects;
	},
	effectManufacturers(state) {
		return state.effectManufacturers;
	},
	effectManufacturerFromSlug(state, getters) {
		return slug => state.effectManufacturers.find(effectManufacturer => {
			return getters.slug(effectManufacturer) == slug;
		})
	},
	effectsFromManufacturer(state) {
		return manufacturer => state.effects.filter(effect => {
			return effect.manufacturer == manufacturer;
		})
	},
	effectFromSlugs(state, getters) {
		return slugs => state.effects.find(effect => {
			let effectManufacturer = getters.effectManufacturerFromSlug(slugs.effectManufacturer);
			return effect.manufacturer == effectManufacturer && getters.slug(effect.model) == slugs.effectModel;
		})
	},
	slug(state) {
		return url => {
			let slug = url;
			/* Remove unwanted characters, only accept alphanumeric, space and dash */
			slug = slug.replace(/[^A-Za-z0-9 -]/g,'');

			/* Replace multi spaces with a single space */
			slug = slug.replace(/\s{2,}/g,' ');

			/* Replace space with a '-' symbol */
			slug = slug.replace(/\s/g, "-");

			/* Use lowercase */
			slug = slug.toLowerCase();

			return slug;
		}
		
		
	}
};