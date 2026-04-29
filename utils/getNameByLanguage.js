export default function getName(lang, nameEn, nameRo, nameRu) {
    let name = '';
    switch (lang) {
        case 'en': name=nameEn;
            break;
        case 'ro': name=nameRo;
            break;
        case 'ru': name=nameRu;
            break;
        default:name='';
    }
    return name;
}