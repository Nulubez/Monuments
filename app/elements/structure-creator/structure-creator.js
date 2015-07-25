Polymer({

	is:'structure-creator', 
	
	properties: {
		blockCount: {
			type: Number,
			value: 10
		},
		container: {
			type: Object,
			value: this.container
		}
	},

	hostAttributes: {
		structureNumArray: [[]],
		creatorType:"default"
	},

	main: function() {
		structureViewer = this.container.$.structureViewer;
		parentDiv = structureViewer.$.content;
		testNum =this.blockCount
		//this.getPropertiesFromForm();
		//structureViewer.setProperties();
		
		this.deleteChildren(parentDiv);
		this.createPyramid(testNum);

		for(n = 0; n < this.structureNumArray.length; n++){
			d = Polymer.dom(parentDiv).appendChild(document.createElement("div"));
			d.setAttribute('class', "contentDiv");
			d.setAttribute('id', 'rowDiv' + n);
			iconArray = this.createIconArray(this.structureNumArray[n]);
			for (aa = 0; aa < iconArray.length; aa++){
				Polymer.dom(d).appendChild(iconArray[aa]);
			}
		}

		this.container.htmlContent = parentDiv.innerHTML;

  },

  getPropertiesFromForm: function() {
  	blockValueNumber = document.getElementById("structure_block_value").value;
		testNum = this.$.structure_total_block.value;
  },

	createPyramid: function(num) {
		//place blocks (0's) in arrays
		this.structureNumArray = [[]];

		for (i = 0; i < num; i++) {
			var placed = false;
			var currentRowIndex = 0;
			var isFirstRow = true;
			var tempArray;

			while(!placed) {
				tempArray = this.checkRow(currentRowIndex, isFirstRow);
				var createTopRow = tempArray[0];
				var goToNextRow = tempArray[1];
				
				if (createTopRow) {
					this.structureNumArray.unshift([0]);
					placed = true;
				}	else if (goToNextRow) {
					currentRowIndex++;
					isFirstRow = false;
				} else {
					this.structureNumArray[currentRowIndex].push(0);
					placed = true;
				}
			}
		}

		//Place in pyramid shape; add surroundings
		var spaces = 0;
		for (n = 1; n < (this.structureNumArray.length + 1); n++){
		  spaces++;
		  for (y = 0; y < spaces; y++){
			  this.structureNumArray[this.structureNumArray.length - n].push(1);
			  this.structureNumArray[this.structureNumArray.length - n].unshift(1);
			}
		}
		//add top layer
		this.structureNumArray.unshift([1]);
		for (y = 0; y < spaces; y++){
			this.structureNumArray[0].push(1);
			this.structureNumArray[0].unshift(1);
		
		}
		
		//equalize row length
		for (n = 0; n < this.structureNumArray.length; n++){
			var tempNum = (this.structureNumArray[this.structureNumArray.length - 1].length) - (this.structureNumArray[n].length);
			if (this.structureNumArray[n].length != this.structureNumArray[this.structureNumArray.length - 1].length){
				for(y = 0; y < tempNum; y++){
					this.structureNumArray[n].push(1);
				}
			}
		}

	},

  createIconArray: function(row) {
  	var tempRow = row;
  	var tempArray = [];
  	var blockRowClass;
  	var blockColumnClass;
  	var tempBlock;
		for (ci = 0; ci < tempRow.length; ci++){
			blockRowClass= "row" + this.structureNumArray.indexOf(row);
  		blockColumnClass = "col" + ci.toString();
  		blockId = blockRowClass + blockColumnClass;
			tempBlock = document.createElement("single-block");

  		switch (tempRow[ci]) {
  			case 0:
  				tempBlock.iconName = this.container.blockIcon;
					tempBlock.blockClasses = "buildingBlock " + blockRowClass + " " + blockColumnClass;
					tempBlock.addEventListener('click', this.container.idSelector.bind(null,blockId, false));				
					//tempBlock.blockValueNumber = blockValueNumber;
					//tempBlock.blockValueUnit = "hour";
					break;
				case 1:
					tempBlock.iconName = this.container.cloudIcon;
					tempBlock.blockClasses = "cloud " + blockRowClass + " " + blockColumnClass;
					tempBlock.addEventListener('click', this.container.idSelector.bind(null,blockId, false));
					break;
				default:
					console.log("ERROR: block does not have label");
			}
			tempBlock.setAttribute('class', tempBlock.classList + tempBlock.blockClasses )	
			tempBlock.setAttribute('id', blockId); 
      tempArray.push(tempBlock);
		}  			
		return tempArray;
  },

  deleteChildren: function(parent) {
  	while (parent.firstChild) {
  		parent.removeChild(parent.firstChild);
	  }
	  this.structureNumArray = [ [] ];
  },

  checkRow: function(rowIndex, isFirstRow) {
	  //checkRow[0]: createTopRow; 
	  //checkRow[1]: goToNextRow;
	  //checkRow[2]: placeBlockHere;

  	var createTopRow = false;
  	var goToNextRow = false;
  	var placeBlockHere = false;
  	
  	var currentRow = this.structureNumArray[rowIndex];
  	var currentRowBlocks = this.numBlocksInRow(currentRow);
  	var firstRow = isFirstRow;

  	var nextRow;
  	var nextRowExists = false;
  	var nextRowBlocks;

  	//assign nextRow and nextRowBlocks
  	if (rowIndex != this.structureNumArray.length - 1){
  		nextRow = this.structureNumArray[rowIndex + 1];
  		nextRowBlocks = this.numBlocksInRow(nextRow);
  		nextRowExists = true;
  	}

  	//set values of createTopRow, goToNextRow, placeBlockHere
  	if ((this.numBlocksInRow(currentRow) == 3) && firstRow){
  		createTopRow = true;
  	} else if ((nextRowExists) && currentRowBlocks + 3 > nextRowBlocks) {
  		goToNextRow = true;
  	} else {
  		placeBlockHere = true;
  	}
  	return [createTopRow, goToNextRow, placeBlockHere];
  },

	numBlocksInRow: function(row) {
  	var numOfBlocks = 0;
  	for (qq = 0; qq < row.length; qq++) {
  		if (row[qq] == 0) {
  			numOfBlocks++;
  		}
  	}
  	return numOfBlocks;
  },


});
