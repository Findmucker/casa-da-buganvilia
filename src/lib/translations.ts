interface LocalizedRecord {
  locale: string;
}

export function getLocalizedRecord<T extends LocalizedRecord>(
  records: T[],
  locale: string,
): T | undefined {
  return (
    records.find((record) => record.locale === locale) ??
    records.find((record) => record.locale === "en") ??
    records.find((record) => record.locale === "pt") ??
    records[0]
  );
}
