import DOMPurify from 'isomorphic-dompurify';

const TEXT_NODE_TYPE = 3;

/*
  Тут мы проходим по всем текст-нодам и добавляем пробел в конце,
  таким бразом мы отделяем знаки пунктуации от последующего текста.
  Основная задача - решить проблему с точкой, которая при соединении слов портит поиск: https://github.com/meilisearch/meilisearch/issues/2962
*/

DOMPurify.addHook('afterSanitizeElements', function (node) {
  // @ts-expect-error
  if(node.nodeType === TEXT_NODE_TYPE){
    // @ts-expect-error
    node.textContent += ' ';
  }
});

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

