import * as Yup from 'yup';

export const profileSchema = Yup.object({
    name: Yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
});
