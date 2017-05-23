# Get Promo Beers
Simple node app to get data about beer promotion in your local store (Poland only), data is taken from alleceny.pl portal.
Used express.js, request and jsdom.

## Example
Url `http://yourdomainnameexample.com/shopname` (`shopname` is a parameter, you should replace it with real shop name and be sure that your shop is available in alleceny.pl), returns json with beer promotions:
```
[
  {
    "name": "Super cold Beer",
    "price": "1,99 zł",
    "unit": "500 ml"
  },
  ...
]
```
If you want to test it just clone this project, and type `npm start` in your terminal.
