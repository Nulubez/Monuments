Polymer( {

  is: 'block-icon-buttons',

  ready: function() {
    structureContainer=document.getElementById("structureContainer");
  },

  androidIcon: function() {
  	structureContainer.blockIcon = 'android';
  },
  heartIcon: function() {
  	structureContainer.blockIcon = 'favorite-border';
  },
  circleIcon: function() {
  	structureContainer.blockIcon = 'radio-button-unchecked';
  },
  starIcon: function() {
  	structureContainer.blockIcon = 'star-border';
  },
  squareIcon: function() {
  	structureContainer.blockIcon = 'check-box-outline-blank';
  },
  lightCloudIcon: function() {
    structureContainer.blockIcon = 'cloud-queue';
  }
});
		

