Polymer({

  is: 'pyramid-creator', 

  properties: {
    blockIcon: {
      type: String,
      value: 'check-box-outline-blank'
    },
    cloudIcon: {
      type: String, 
      value: 'cloud'
    },
    htmlContent: {
      type: String,
      value: ""
    },
    blockCount: {
      type: Number,
      value: 10
    }
  },

  hostAttributes: {
    pyramid: [[]],
    currentIconRow: []
  },

  ready: function() {

  },


  testButton: function() {
    this.removeBorder();
  },
 

 

  main: function() {
  	var testNum = this.blockCount;
  	var parentDiv = this.$.structureViewer;

  	this.deleteChildren(parentDiv);
  	this.createPyramid(testNum);

  	for(n = 0; n < this.pyramid.length; n++){
  		Polymer.dom(parentDiv).appendChild(document.createElement("div"));
  		iconArray = this.createIconArray(this.pyramid[n]);
  		for (aa = 0; aa < iconArray.length; aa++){
  			Polymer.dom(parentDiv).appendChild(iconArray[aa]);
  		}
  	} 

    this.htmlContent = structureViewer.innerHTML;

  },

	createPyramid: function(num) {
		//place blocks (0's) in arrays
		this.pyramid = [[]];

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
					this.pyramid.unshift([0]);
					placed = true;
				}	else if (goToNextRow) {
					currentRowIndex++;
					isFirstRow = false;
				} else {
					this.pyramid[currentRowIndex].push(0);
					placed = true;
				}
			}
		}

		//Place in pyramid shape; add surroundings
		var spaces = 0;
		for (n = 1; n < (this.pyramid.length + 1); n++){
		  spaces++;
		  for (y = 0; y < spaces; y++){
			  this.pyramid[this.pyramid.length - n].push(1);
			  this.pyramid[this.pyramid.length - n].unshift(1);
			}
		}
		//add top layer
		this.pyramid.unshift([1]);
		for (y = 0; y < spaces; y++){
			this.pyramid[0].push(1);
			this.pyramid[0].unshift(1);
		
		}
		//rows
		for (n = 0; n < (this.pyramid.length); n++){
			this.pyramid[n].unshift(2);
		}
		//columns
		this.pyramid.unshift([3]);
		for (y = 0; y < spaces; y++){
			this.pyramid[0].unshift(3);
			this.pyramid[0].push(3);
		}
		this.pyramid[0][0] = 4;
		//equalize row length
		for (n = 0; n < this.pyramid.length; n++){
			var tempNum = (this.pyramid[this.pyramid.length - 1].length) - (this.pyramid[n].length);
			if (n == 0){ 
				for(y = 0; y < tempNum; y++){
					this.pyramid[n].push(3);
				} 
			}else if (this.pyramid[n].length != this.pyramid[this.pyramid.length - 1].length){
				for(y = 0; y < tempNum; y++){
					this.pyramid[n].push(1);
				}
			}
		}
	},

  addOne: function() {
  	this.blockCount++;
    this.main();
  },

  checkRow: function(rowIndex, isFirstRow) {
	  //checkRow[0]: createTopRow; 
	  //checkRow[1]: goToNextRow;
	  //checkRow[2]: placeBlockHere;

  	var createTopRow = false;
  	var goToNextRow = false;
  	var placeBlockHere = false;
  	
  	var currentRow = this.pyramid[rowIndex];
  	var currentRowBlocks = this.numBlocksInRow(currentRow);
  	var firstRow = isFirstRow;

  	var nextRow;
  	var nextRowExists = false;
  	var nextRowBlocks;

  	//assign nextRow and nextRowBlocks
  	if (rowIndex != this.pyramid.length - 1){
  		nextRow = this.pyramid[rowIndex + 1];
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

  updateIcons: function(arrayOfIcons){
  	for (cc = 0; cc < arrayOfIcons.length; cc++){
  		if (arrayOfIcons[cc].classList.contains("block")) {
  			arrayOfIcons[cc].setAttribute('iconName', this.blockIcon);
  		}
  		if (arrayOfIcons[cc].classList.contains("cloud")) {
  			arrayOfIcons[cc].setAttribute('iconName', this.cloudIcon);
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
			blockRowClass= "row" + this.pyramid.indexOf(row);
  		blockColumnClass = "col" + ci.toString();
  		blockId = blockRowClass + blockColumnClass;
			tempBlock = document.createElement("single-block");


  		switch (tempRow[ci]) {
  			case 0:
  				tempBlock.iconName = this.blockIcon;
					tempBlock.blockClasses = "block " + blockRowClass + " " + blockColumnClass;
					tempBlock.addEventListener('click', this.idSelector.bind(null,blockId));				
					break;
				case 1:
					tempBlock.iconName = this.cloudIcon;
					tempBlock.blockClasses = "cloud " + blockRowClass + " " + blockColumnClass;
					tempBlock.addEventListener('click', this.idSelector.bind(null,blockId));
					break;
				case 2:
					tempBlock.iconName = "arrow-forward";
					tempBlock.blockClasses = "rowArrow border";
					tempBlock.addEventListener('click', this.classSelector.bind(null,blockRowClass));
					break;
				case 3:
					tempBlock.iconName = "arrow-drop-down";
					tempBlock.blockClasses = "colArrow border";
					tempBlock.addEventListener('click', this.classSelector.bind(null,blockColumnClass));
					break;
				case 4:
					tempBlock.iconName = "settings";
          tempBlock.blockClasses = "settings border";
					break;
				default:
					console.log("ERROR: block does not have label");
			}	
			tempBlock.setAttribute('id', blockId); 
      tempArray.push(tempBlock);
		}  			
		return tempArray;
  },

  deleteChildren: function(parent) {
  	while (parent.firstChild) {
  		parent.removeChild(parent.firstChild);
	  }
	  this.rows = [ [] ];
  },

  removeBorder: function() {
    this.classSelector("border");
    for (hh = 0; hh < this.currentIconRow.length; hh++) {this.currentIconRow[hh].parentNode.removeChild(this.currentIconRow[hh]);}
    currentIconRow = [];
  },

  classSelector: function(classSelected) {
  	var pyramidCreator = document.getElementById("pyramidCreator");
  	var cssSelector = "." + classSelected;
  	var elementArray = Polymer.dom(pyramidCreator).querySelectorAll(cssSelector);
    for (ee = 0; ee < elementArray.length; ee++ ) {
  		var elementId = elementArray[ee].id;
  		pyramidCreator.idSelector(elementId);
  	}
  	
  	//for (dd = 0; dd < currentIconRow.length; dd++){
  	//	currentIconRow[dd].setAttribute("active", "True");
  	//}
  },

  idSelector: function(idSelected){
  	var pyramidCreator = document.getElementById("pyramidCreator");
  	var elementSelected = Polymer.dom(pyramidCreator).querySelector('#' + idSelected)
  	if (pyramidCreator.currentIconRow.indexOf(elementSelected) != -1){
  		elementSelected.setAttribute('isActive', false);
  		pyramidCreator.currentIconRow.splice(pyramidCreator.currentIconRow.indexOf(elementSelected), 1);
  	} else {
  		pyramidCreator.currentIconRow.push(elementSelected);
  		elementSelected.setAttribute('isActive', true);
  	}
  }

 });

