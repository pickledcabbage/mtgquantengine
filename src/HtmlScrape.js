const conv = require('./Conv')
const cheerio = require('cheerio');

// Cheerio extract functions
exports.getSetData = html => {
    data = [];
    const $ = cheerio.load(html);
    $('section.products.products--list div.product__card').each((row, raw_element) => {
        data.push({
            set_name : $(raw_element).find('div.product__summary a.product__group').text().trim(),
            set_href : $(raw_element).find('div.product__summary a.product__group').attr('href'),
            full_href : $(raw_element).find('div.product__summary a.product__name').attr('href'),
        });
    });
    return data;
}

exports.getPriceData = (html, set_name) => {
    data = [];
    const $ = cheerio.load(html);
    $('section.product-listings div.product-listing').each( (row, raw_element) => {
      data.push({
          set : set_name,
          seller : $(raw_element).find('div.product-listing__seller div a.seller__name').text(),
          condition : $(raw_element).find('div a.condition').text(),
          price : conv.priceConv($(raw_element).find('div.product-listing__pricing span.product-listing__price').text()),
          shipping : conv.shippingConv($(raw_element).find('div.product-listing__pricing span.product-listing__shipping').text().trim()),
          amount: conv.amountConv($(raw_element).find('input.quantityAvailable').attr('value')),
      })
    });
    return data;
}