Polymer({

	is: 'structure-viewer', 

	properties: {
		structureObject: {
			type: Object
		},
		structureName: {
			type: String,
			value: "TestViewer"
		},
		structureDescription: {
			type: String,
			value: "This is a Test Description."
		}
	},

	setProperties: function() {
		this.setStructureName();
		this.setStructureDescription();
	},

	setStructureName: function() {
		nameInput = document.getElementById("structure_name");
		this.structureName = nameInput.value;
	},

	setStructureDescription: function() {
		descInput = document.getElementById("structure_description");
		this.structureDescription = descInput.value;
	},
	
});
