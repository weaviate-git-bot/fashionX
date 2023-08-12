import { ReadonlyURLSearchParams } from 'next/navigation';

export const createUrl = (pathname, params) => {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck, startsWith) =>
    stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;
