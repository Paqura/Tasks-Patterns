import DOMPurify from 'isomorphic-dompurify';

const sanitizeText = (text: string) => DOMPurify.sanitize(text, {ALLOWED_TAGS: []});

type TObject = Record<string, unknown>;

const isObject = (value: unknown): value is TObject => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/*
  Функция удаляет из объекта свойства переданные в propsToRemove
  Строковые значения проходят через sanitizeText
*/

export const transformData = (obj: TObject, propsToRemove: string[]) => {
  for (const [key, value] of Object.entries(obj)) {
    if (propsToRemove.includes(key)) {
      delete obj[key];
      continue;
    }

    if (Array.isArray(value)) {
      obj[key] = value.map((innerValue) => transformData(innerValue, propsToRemove));
      continue;
    }

    if (isObject(value)) {
      obj[key] = transformData(value, propsToRemove);
      continue;
    }

    if (typeof value === 'string') {
      obj[key] = sanitizeText(value);
    }
  }

  return obj;
};
