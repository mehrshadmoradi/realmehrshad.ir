"use client";

import { i18n, type Locale } from "i18next.config";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value as Locale;
    const newPath = redirectedPathname(selectedLocale);
    router.push(newPath);
  };

  return (
    <div>
      <select
        onChange={handleLocaleChange}
        defaultValue={pathname?.split("/")[1] || i18n.defaultLocale}
        className="rounded-md"
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  );
}
