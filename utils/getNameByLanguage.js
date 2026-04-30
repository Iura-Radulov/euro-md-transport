export default function getName(lang,nameRu, nameEn, nameRo ) {
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