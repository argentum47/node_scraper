function $( selector ) {
  if( typeof selector === "string" )
    return new dom(selector);
  else if (selector instanceof Node)
    return new dom(selector);
}


$.id = function( selector ) {
  return $( '#' + selector );
}

$.cl = function( selector ) {
  return $( '.' + selector );
}

$.classOf = function( value ) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

function dom( selector ) {
  this.elem = typeof selector === 'string' ?
    document.querySelector( selector ) :
    selector;
}

dom.prototype.find = function( selector ) {
  var elem;
  elem = this.elem.querySelectorAll( selector );
  if( elem.length === 1 )
    return elem[0]
  else
    return [].slice.call( elem );
}

dom.prototype.filter = function( nodelist, selector, prop ) {
  return [].slice.call(nodelist).map(function(node) {
    if( node.nodeType === 1 )
    return $(node).find(selector);
  }).filter(function(d) {
    return d != undefined &&
      ( $.classOf(d.length) === 'Number' ? d.length > 0 : true)
  });
}

dom.prototype.prev = function() {
  var elem;

  elem = this.elem;
  do {
		elem = elem.previousSibling;
	} while ( elem && elem.nodeType !== 1 );

	return elem;
}

dom.prototype.prevAll = function() {
  var cur, matched = [];
  var that = this;

  cur = this.elem.previousSibling;
  while( cur && cur.nodeType !== 9 ) {
    if( cur === undefined )
      break;
    if(cur.nodeType === 1)
      matched.push( cur );
    cur = cur.previousSibling;
  }

  return matched;
}

dom.prototype.next = function() {
  var elem;

  elem = this.elem;
  do {
    elem = elem.nextSibling;
  } while( elem && elem.nodeType !== 1 )

  return elem;
}

dom.prototype.nextAll = function( addBack ) {
  var cur, matched = [];
  var that = this;

  cur = this.elem.nextSibling;

  while( cur && cur.nodeType !== 9 ) {
    if( cur === undefined )
      break;
    if( cur.nodeType === 1 )
      matched.push( cur );
    cur = cur.nextSibling;
  }
  if( addBack ) {
    matched.push( this.elem );
  }
  return matched;
}

dom.prototype.nextUntil = function( until ) {
  var cur, matched =[];

  cur = this.elem.nextSibling;

  while( cur && cur.nodeType !== 9 && $( until ).elem !== cur) {
    if( cur === undefined )
      break;
    if( cur.nodeType === 1 )
      matched.push( cur );
    cur = cur.nextSibling;
  }
  return matched;
}
