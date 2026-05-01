import { usePage } from '@inertiajs/react';

export default function useTranslate() {
    const { translations } = usePage().props;

    const t = (key) => {
        // Support for dot notation (e.g. 'common.welcome')
        const keys = key.split('.');
        let result = translations;

        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        return result;
    };

    return { t };
}
