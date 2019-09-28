
exports.priceConv = (price) => {
    var newPrice = price.substring(price.indexOf('$')+1)
    return parseFloat(newPrice)
}

exports.shippingConv = (shipping) => {
    if (shipping.indexOf('Free') != -1)
    {
        if (parseFloat(shipping.substring(shipping.indexOf('$')+1)) >= 25)
            return 0
        else
            return 0.79
    }
    if (shipping.indexOf('Included') != -1)
        return 0
    return parseFloat(shipping.substring(shipping.indexOf('$')+1))
}

exports.amountConv = (amount) =>
{
    return parseInt(amount)
}