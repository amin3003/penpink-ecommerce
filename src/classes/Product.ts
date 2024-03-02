import { WebObject } from '@azrico/webobject';
import ProductVariation from './ProductVariation';
//TODO fix properties
export class Product extends WebObject {
	static readonly __cache_name: string = 'product';
	static readonly __web_type: string = 'products';
	static readonly __web_path: string = 'products';

	name = '';
	short_desc = '';
	categories: string[] = [];
	variations: ProductVariation[] = [];

	constructor(
		initObject: Partial<Product> | null | undefined | number,
		is_readonly = false
	) {
		super(is_readonly);
		this.loadValues(initObject);
		this.init();
	}
	init() {
		this.variations = this.variations.map((r) => new ProductVariation(r));
	}
}

export default Product;
