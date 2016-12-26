var ElementMaxHeight = function() {
  this.initialize.apply(this, arguments);
}

ElementMaxHeight.prototype = {
  initialize: function(className) {
    this.elements = document.getElementsByClassName(className || 'maxheight');    
    this.textElement = document.createElement('span');
    this.textElement.appendChild(document.createTextNode('A'));
    this.textElement.style.display = 'block';
    this.textElement.style.position = 'absolute';
    this.textElement.style.fontSize = '1em';
    this.textElement.style.top = '-1000px';
    this.textElement.style.left = '-1000px';
    document.body.appendChild(this.textElement);
    this.textElementHeight = document.getDimensions(this.textElement).height;
    var __object = this;
    var __checkFontSize = this.checkFontSize;
    this.checkFontSizeInterval = window.setInterval(function() {return __checkFontSize.apply(__object)}, 500);

    this.expand();

    // Refresh elements height onResize event
    var __expand = this.expand;
    if (window.addEventListener) {
      window.addEventListener('resize', function(event) {return __expand.apply(__object, [( event || window.event)])}, false);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', function(event) {return __expand.apply(__object, [( event || window.event)])});
    }
  },

  expand: function() {
    this.reset();
  	for (var i = 0; i < this.elements.length; i++) {  	
      this.elements[i].style.height = document.getDimensions(this.elements[i].parentNode).height + 'px';
  	}
  },

  reset: function() {
    for (var i = 0; i < this.elements.length; i++) {    
      this.elements[i].style.height = 'auto';
    }
  },

  checkFontSize: function() {
  	var height = document.getDimensions(this.textElement).height;
  	if(this.textElementHeight != height) {
  		this.textElementHeight = height;
  		this.expand();
  	}
  }  
}


if (!!document.evaluate) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, parentElement || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(query.snapshotItem(i));
    return results;
  }
}

document.getElementsByClassName = function(className, parentElement) {
  if (!!document.evaluate) {
    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    return document._getElementsByXPath(q, parentElement);
  } else {
    var children = (parentElement || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
      child = children[i];
      if (child.className.length != 0 &&
          (child.className == className ||
           child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))) {      
        elements.push(child);
      }
    }
    return elements;
  }
}

document.getDimensions = function (element) {
  var display = element.style.display;
  if (display != 'none' && display != null) { // Safari bug
    return {width: element.offsetWidth, height: element.offsetHeight};
  }

  return {width: originalWidth, height: originalHeight};
}