export function generateAlbumCode(title: string, date: Date) {
    // 1. Pega as iniciais (ex: "Viagem Férias" -> "VF")
    const initials = title
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join('');

    // 2. Format  date (MMYY)
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    // 3. Gera um sufixo aleatório de 2 caracteres (estilo serial number)
    const random = Math.random().toString(36).substring(2, 4).toUpperCase();

    return `${initials}${month}${year}-${random}`;
}