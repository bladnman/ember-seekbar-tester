import Ember from 'ember';

export default Ember.Component.extend({
  // API
  startOffset : 15,
  currentOffset : 0,
  endOffset : 45,
  duration : 60,

  isLive : false,

  activeStyle : function () {
    var outString = '';
    var startOffset = this.get('startOffset');
    var endOffset = this.get('endOffset');
    var duration = this.get('duration');

    var startPerc = this.percentFloat(startOffset, duration)*100;
    var endPerc = this.percentFloat(endOffset, duration)*100;
    endPerc = endPerc - startPerc

    // START
    outString += 'left:'+ startPerc +'%;';

    // END
    outString += 'width:'+ endPerc +'%;';

    return outString;
  }.property('endOffset,startOffset,duration'),
  playheadStyle : function () {
    var outString = '';
    var currentOffset = this.get('currentOffset');
    var duration = this.get('duration');

    // CURRENT
    outString += 'left:'+ this.percentFloat(currentOffset, duration)*100 +'%;';

    return outString;
  }.property('currentOffset,duration'),
  percentFloat : function (part, whole) {
    if (  typeof part === 'undefined' || part === null || part === 0 ||
          typeof whole === 'undefined' || whole === null || whole === 0) {
      return 0.0;
    }
    return Math.max(Math.min(part/whole, 1.0), 0.0);
  },




  // S U P P O R T I N G   T E S T S
  sliderCurrentOffsetPercent : function () {
    return 34.0;
  }.property(),
  sliderStartEndRange : function () {
    return {
    		'min': [ 0 ],
    		'max': [ 100 ]
    	};
  }.property(),
  sliderStartEndStart : function () {

    var soffPerc = this.get('startOffset') / this.get('duration');
    var eoffPerc = this.get('endOffset') / this.get('duration');
    return [soffPerc*100, eoffPerc*100];
  }.property(),
  actions : {
    setValue : function (key, value) {
      this.set(key, value);
    },
    setValues : function (keyValues) {
      var kvs = keyValues.split(';');
      for (var i = 0; i < kvs.length; i++) {
        var kvArray = kvs[i].split(':');
        if (kvArray.length > 1) {
          var key = kvArray[0];
          var value = kvArray[1];
          this.set(key, value);
        }
      }
    },
    sliderStartEndValueChanged:function(v) {
      var start = v[0] * 1;
      var end = v[1] * 1;
      var duration = this.get('duration');

      this.set('startOffset', duration * (start/100));
      this.set('endOffset', duration * (end/100));
    },
    sliderCurrentValueChanged:function(v) {
      var position = v;
      var duration = this.get('duration');

      this.set('currentOffset', duration * (position/100));
      console.log(this.get('currentOffset'));

    },
    toggleValue : function (key) {
      var isTrue = !!this.get(key);
      this.set(key, ! isTrue);
      return true;
    }
  }
});
