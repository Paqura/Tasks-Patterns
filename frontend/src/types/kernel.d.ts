type TNullable<T> = T | null
type TClasses<TKeys extends string> = Partial<Record<TKeys, string>>
