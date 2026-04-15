export const formatPrice = (value: number): string => `$${value}`;

export const formatOrderDate = (value: string): string =>
  new Date(value).toLocaleDateString('ru-RU');
