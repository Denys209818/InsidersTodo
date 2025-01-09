import { object, string } from 'yup';

export const emailSchema = object().shape({
  email: string().email('Не коректна E-mail').required('Поле обов\'язкове!')
});