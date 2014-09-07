window.ITStorage = (function(){
	var db = {};

	return {
		// Create a storage area
		create: function(name) {
			// If name is not defined
			if( ! ( name in db ) ) {

				// Add a new area in the database
				db[name] = (function(){

					// Datas of this area
					var datas = {};

					return {
						// Getter for this area
						get: function(key) {
							return datas[key];
						},

						// Setter for this area
						set: function(key, value) {
							datas[key] = value;
						}
					};
				})();

				return true;
			}
			return false;
		},

		// Make an access to the database
		db: db
	};
})();