import { WebObject } from '@azrico/webobject';
import ProductVariation from './ProductVariation';

export class Category extends WebObject {
	static readonly __cache_name: string = 'categories';
	static readonly __web_type: string = 'categories';
	static readonly __web_path: string = 'categories';

	slug = '';
	name = '';

	constructor(
		initObject: Partial<Category> | null | undefined | number,
		is_readonly = false
	) {
		super(is_readonly);
		this.loadValues(initObject);
	}
}

export default Category;
