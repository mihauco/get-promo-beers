const express = require( 'express' );
const getBeers = require( './getBeers' );

const app = express();

// returns json with beer promotions for :shop
app.get( '/:shop', ( req, res ) => {
  getBeers( req.params.shop )
    .then( ( data ) => {
      res.json( data );
    } );
} );

app.listen( 8080, () => {
  console.log( 'app started, grab a beer!' );
} );
