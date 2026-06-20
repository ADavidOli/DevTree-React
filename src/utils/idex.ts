export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

// utilidad para validar si es una URL valida

export function isValidUrl (url: string){
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}