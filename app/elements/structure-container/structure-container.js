Polymer({

   is: 'structure-container',

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
    currentIconRow: {
      type: Array,
      value: []
    }
  },

  hostAttributes: {
    testNum: 0,
    containsCreator: false,
    containsEditor: false,
    containsViewer:false
  },

 
  ready: function() {
    this.creator = this.$.structureCreator;
    this.creator.container = this;
    //this.creator.shown = this.containsCreator;
    this.editor = this.$.structureEditor;
    this.editor.container= this;
    //this.editor.shown = this.containsEditor;
    this.viewer = this.$.structureViewer;
    this.viewer.container = this;
  },

  test: function(){
  },

  create: function() {
    this.creator.main();
  },

  classSelector: function(classSelected, useAsActivator) {
    
    useAsActivator = typeof useAsActivator !== 'undefined' ? useAsActivator : false;
    this.currentIconRow = [];
    var structureContainer = document.getElementById("structureContainer");
  	var cssSelector = "." + classSelected;
  	var elementArray = Polymer.dom(structureContainer.viewer.root).querySelectorAll(cssSelector);

    if (useAsActivator){
      structureContainer.activate('class', classSelected);
    }
    for (ee = 0; ee < elementArray.length; ee++ ) {
  		var elementId = elementArray[ee].id;
  		structureContainer.idSelector(elementId, true);
  	}
    return this.currentIconRow;
  },

  idSelector: function(idSelected, callOfClassSelector){

    callOfClassSelector = typeof callOfClassSelector !== 'undefined' ? callOfClassSelector : false;
    
  	var structureContainer = document.getElementById("structureContainer");
    var elementSelected = Polymer.dom(structureContainer.viewer.root).querySelector('#' + idSelected);

    if (!callOfClassSelector ){
      structureContainer.activate('id', elementSelected.id);
    }

    if (structureContainer.currentIconRow.indexOf(elementSelected) != -1){
      if (!callOfClassSelector){
     		structureContainer.currentIconRow.splice(structureContainer.currentIconRow.indexOf(elementSelected), 1);
      }
  	} else {
  		structureContainer.currentIconRow.push(elementSelected);
  	}
    return elementSelected;
  },

  activate: function(typeOfActivation, htmlId){
    //this is only made for single elements
    //for class activations, make certain that element.id is a class
    container = document.getElementById("structureContainer")
    var element = Polymer.dom(container.viewer.root).querySelector("#"+htmlId);
    switch (typeOfActivation) {
      case 'class':
        var tempArray = this.classSelector(element.id);
        if (element.isActive==true){
          for (tt=0; tt < tempArray.length; tt++){
            tempArray[tt].isActive = false
            tempArray[tt].$.paperButton.style.backgroundColor = "rgba(54, 25, 25, 0.0)";
          }
          element.$.paperButton.style.backgroundColor = "rgba(54, 25, 25, 0.0)";
          element.isActive = false;
        } else{
            for (yy=0; yy < tempArray.length; yy++){
              tempArray[yy].isActive = true
              tempArray[yy].$.paperButton.style.backgroundColor = "rgba(54, 25, 25, .1)";
            }
            element.$.paperButton.style.backgroundColor = "rgba(54, 25, 25, .1)";
            element.isActive = true;
        }
        break;
      case 'id':
        if (element.isActive == true){
          element.$.paperButton.style.backgroundColor = "rgba(54, 25, 25, 0.0)";
          element.isActive = false;
        }else {
          element.$.paperButton.style.backgroundColor = "rgba(54, 25, 25, .1)";
          element.isActive = true;
        }
        break;
      default:
        console.log("You didn't specify the type typeOfActivation, idiot.")
        break;
    }

  },

  resetCurrentIcons: function(){
    for (ee=0; ee < this.currentIconRow.length; ee++) {
      var currentElement = this.idSelector(this.currentIconRow[ee].id);
    }
    currentIconRow = [];
  }


});
