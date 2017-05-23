const jsdom = require( 'jsdom' );
const request = require( 'request-promise-native' );
const { JSDOM } = jsdom;

module.exports = function( shopName ) {
  // request page html
  return request( `http://www.alleceny.pl/promocje/${shopName}/159/alkohole?order=price&sort=asc` )
          .then( ( html ) => {
            // create DOM with JSDOM
            const pageDOM = new JSDOM( html ).window;
            // get all products boxes
            const productsBoxes = pageDOM.document.querySelectorAll( '#category .productsView-grid .productBox' );

            return Array.from( productsBoxes )
                    .filter( box => {
                      // not every box contains product, some of them are links
                      // to promo press, we need to get rid of them by
                      // checking if box contains element with
                      // 'superoffer-label press' classes
                      return !box.querySelector( '.superoffer-label.press' )
                    } )
                    .filter( alcohol => {
                      // we want only beers, so we need to throw out
                      // wines, vodkas and radler shit
                      let name = alcohol.querySelector( '.productBox-title a' ).textContent;
                      return !(/(wino|wódka|radler|shandy|ice)/gi).test( name );
                    } )
                    .map( beer => {
                        let price = beer.querySelector( '.productBox-price' ).textContent.replace( /\n/g, '' ).trim().split( '/' )
                        return {
                          name: beer.querySelector( '.productBox-title a' ).textContent.replace( /\n/g, '' ).trim(),
                          price: price[ 0 ].trim(),
                          unit: price[ 1 ].trim()
                        }
                    } );
          } )
};
