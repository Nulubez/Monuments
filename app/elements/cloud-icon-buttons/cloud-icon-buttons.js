Polymer( {

  is: 'cloud-icon-buttons',

  ready: function() {
    structureContainer=document.getElementById("structureContainer");
  },
  clearIcon: function() {
    structureContainer.cloudIcon = '';
  },
	lightCloudIcon: function() {
  	structureContainer.cloudIcon = 'cloud-queue';
  },
  darkCloudIcon: function() {
  	structureContainer.cloudIcon = 'cloud';
  }
});
