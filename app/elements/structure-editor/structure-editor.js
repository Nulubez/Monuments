Polymer({

  is: 'structure-editor', 
  
  properties: {
    container: {
      type: Object,
      value: this.container
    },
    rows: {
      type: Array,
      value: []
    },
    cols: {
      type: Array,
      value: []
    },
    empty: {
      type: Array,
      value: []
    }
  },

  hostAttributes: {
    //shown: this.shown
  },

  ready: function(){
  },

  complete: function(){
    this.removeBorder();
    this.setFormHtmlContent();
  },

  setFormHtmlContent: function() {
    formHtmlContent = document.getElementById("structure_html_content");
    formHtmlContent.value = this.container.htmlContent;
  },

  setRowsandCols: function() {
    this.rows = this.container.classSelector("contentDiv");
    this.cols = this.container.classSelector("row0");
    this.container.currentIconRow = [];
  },

	createBorder: function() {
    var colArrowId;
    var rowArrowId;
    this.setRowsandCols();
    for (qq = 0; qq< this.rows.length; qq++){
      rowArrowId = 'row' + qq;
      div = this.rows[qq];
      rowArrow = document.createElement("single-block");
      rowArrow.iconName = "arrow-forward";
      rowArrow.blockClasses = "border";
      rowArrow.setAttribute('id', rowArrowId);
      rowArrow.setAttribute('class', rowArrow.classList + "border") 
      rowArrow.addEventListener('click', this.container.classSelector.bind(null, rowArrowId, true));
      Polymer.dom(div).insertBefore(rowArrow, div.firstChild);
    }
    for (ww = 0; ww< this.cols.length + 1; ww++){
      div = Polymer.dom(this.container.viewer.root).querySelector('#rowDiv0');

      colArrow = document.createElement("single-block");
      if (ww == 0){
        colArrowId = "editorSettings";
        colArrow.iconName = "settings";
        colArrow.blockClasses = "border settings";
      } else {
        colArrowId = "col" + (ww - 1);
        colArrow.iconName = "arrow-drop-down";
        colArrow.blockClasses = "border";
      }
      colArrow.setAttribute('class', colArrow.classList + "border")  
      colArrow.setAttribute('id', colArrowId);
      colArrow.addEventListener('click', this.container.classSelector.bind(null,colArrowId, true));
      Polymer.dom(div.parentNode).insertBefore(colArrow, div);
    }
  },


	removeBorder: function() {
    this.container.resetCurrentIcons();
    border = this.container.classSelector("border");
    for (hh = 0; hh < border.length; hh++) {
      Polymer.dom(this.container.currentIconRow[hh].parentNode).removeChild(this.container.currentIconRow[hh]);
    }
    this.container.currentIconRow = [];
  },

	/*addOne: function() {
  	this.container.blockCount++;
    this.container.**CREATOR**main();
  },*/

	updateIcons: function(){
    arrayOfIcons = this.container.currentIconRow;
  	for (cc = 0; cc < arrayOfIcons.length; cc++){
  		if (arrayOfIcons[cc].classList.contains("block")) {
  			arrayOfIcons[cc].iconName = this.container.blockIcon;
  		}
  		if (arrayOfIcons[cc].classList.contains("cloud")) {
  			arrayOfIcons[cc].iconName = this.container.cloudIcon;
  		}
  	}
  },



});
