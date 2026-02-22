export function generateAlbumCode(title: string, date: Date): string {
    // 1. Gera as letras iniciais baseadas no título
    const words = title.trim().split(/\s+/).filter(w => w.length > 0);
    const longWords = words.filter(w => w.length > 3);

    let prefix = '';
    if (longWords.length >= 2) {
        prefix = (longWords[0][0] + longWords[1][0]).toUpperCase();
    } else if (longWords.length === 1) {
        prefix = longWords[0].substring(0, 2).toUpperCase();
    } else if (words.length > 0) {
        // Fallback para palavras curtas se não houver longas
        prefix = words[0].substring(0, 2).toUpperCase().padEnd(2, 'X');
    } else {
        // Duas letras aleatórias se não houver palavras
        prefix = Math.random().toString(36).substring(2, 4).toUpperCase();
    }


    // 2. Format  date (DDMMYY)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    // 3. Gera um sufixo aleatório de 2 caracteres (estilo serial number)
    const random = Math.random().toString(36).substring(2, 4).toUpperCase();

    return `${prefix}${day}${month}${year}-${random}`;
}

export function parseDate(dateStr: string): Date {
        // Suporta formatos: "DD/MM/YYYY" ou "DD/MM/YYYY, HH:mm"
        const [datePart, timePart] = dateStr.split(', ');
        const [day, month, year] = datePart.split('/').map(Number);

        if (timePart) {
            const [hours, minutes] = timePart.split(':').map(Number);
            return new Date(year, month - 1, day, hours, minutes);
        }

        return new Date(year, month - 1, day);
    };

