Polymer({

	is: 'single-block', 

	properties: {
		iconName: {
			type: String
		},
		isActive: {
			type: Boolean,
			value: false
		},
		blockClasses: {
			type: String,
			value: ""
		},
		blockValueNumber: {
			type: Number,
			value: 0
		},
		blockValueUnit: {
			type: String,
			value: ""

		},

    icon: {
      type: String
    }

	},

	clickFunction: function(e) {
		this.showInformation();
	},

	showInformation: function(e) {
		if (this.blockValueNumber > 0){
			blockValue = "; Value: " + this.blockValueNumber + " " + this.blockValueUnit
		} else {
			blockValue = "";
		}

		toast1	= this.$.toast1;
		toast1.text = "ID: " + this.id 
		+ "; Classes: " + this.blockClasses 
		+ blockValue;
		toast1.duration = 5000;
		toast1.show()
	}
});
