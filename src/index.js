const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const cartProducts = productsList.filter(({id}) => ids.includes(id))

	const comboArr = cartProducts.reduce((arr, elem) => { 
		!arr.includes(elem.category) ? arr.push(elem.category) : null;
		return arr;
	}, []);

	const cartPromo = promotions[comboArr.length-1]

	let regularPrice = 0
	let totalPromotions = 0

	cartProducts.forEach(( elem ) => {
		let promotionPrices = elem.promotions.find(el => el.looks.includes(cartPromo));
		promotionPrices ? (totalPromotions = totalPromotions + promotionPrices.price) : totalPromotions = totalPromotions +  elem.regularPrice
		regularPrice = regularPrice + elem.regularPrice
	});

	return {
		products: cartProducts.map(p => ({name: p.name, category: p.category})),
		promotion: cartPromo,
		totalPrice: totalPromotions.toFixed(2),
		discountValue: (regularPrice - totalPromotions).toFixed(2),
		discount: (100-(100*totalPromotions/regularPrice)).toFixed(2) + "%"
	};
}

module.exports = { getShoppingCart };