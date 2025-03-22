'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useUrlState = <TData = string>(
  field: string,
  defaultValue?: TData
): [TData | null, (val: TData) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const value = searchParams.get(field) as TData | null;

  const setState = (newValue: TData) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(field, String(newValue));
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (defaultValue && !value) {
      setState(defaultValue);
    }
  }, [field, defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return [value, setState];
};