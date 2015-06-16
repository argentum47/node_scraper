'use strict';

var AppCache = {
  extend: function(dest, src) {
    for(var prop in src) {
      if(src[prop] && src[prop].constructor && src[prop].constructor === Object){
        dest[prop] = dest[prop] || {}
        this.extend(dest[prop], src[prop])
      }
      else
        dest[prop] = src[prop]
    }
  },

  cache: function( namespace ) {
    this[ namespace ] = {};
    this.extend(this[namespace], this.factory)
    return this[namespace];
  },

  factory: {
    set: function( key, value, force ) {
      let data;

      if( force ) this[ key ] = JSON.stringify(data)
      else {
        data = this[ key ] == false ? JSON.stringify([]) : this[ key ]
        data = JSON.parse(data)
        data.push( value )
        this[ key ] = JSON.stringify(data)
      }
      return this;
    },
    get: function( key ) {
      if(this[ key ])
        return JSON.parse(this[key])
      else
        return undefined
    }
  }
}

module.exports = function( namespace ) {
  return AppCache.cache( namespace )
}
