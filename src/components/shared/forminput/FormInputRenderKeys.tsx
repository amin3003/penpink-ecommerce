import { array_first, array_remove, wrap_array } from '@azrico/object';

export type FormInputProps = { include?: string[]; exclude?: string[] };
export function FormInputRenderKeys(props: FormInputProps & { sp: URLSearchParams }) {
	const { sp } = props;
	const useKeys = Boolean(props.include)
		? props.include
		: array_remove(Array.from(sp.keys()), ...wrap_array(props.exclude));

	return useKeys?.map((r, i) => {
		const spValue = sp.get(String(r));
		if (!spValue) return null;
		return <input key={i} hidden name={String(r)} defaultValue={spValue} />;
	});
}
