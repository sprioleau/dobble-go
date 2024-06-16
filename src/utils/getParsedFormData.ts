import { ZodType } from "zod";

export default function getParsedFormData<Schema extends ZodType>({
	formData,
	schema,
}: {
	formData: FormData;
	schema: Schema;
}): Schema extends ZodType<infer T> ? T : never {
	const formDataObject = Object.fromEntries(formData);
	const parsedFormData = schema.safeParse(formDataObject);

	if (parsedFormData.error) {
		throw new Error(parsedFormData.error.issues.map((issue) => issue.message).join(", "));
	}

	return parsedFormData.data;
}
