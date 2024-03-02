import { WebObject } from '@azrico/webobject';

export class ProductVariation extends WebObject {
	varation_id: string = '';
	sku?: string;
	quantity: number = 0;
	buyprice?: number;
	price: number = 0;
	saleprice?: number;
	images?: string[];
	constructor(
		initObject: Partial<ProductVariation> | null | undefined | number,
		is_readonly = false
	) {
		super(is_readonly);
		this.loadValues(initObject);
	}
}

export default ProductVariation;
