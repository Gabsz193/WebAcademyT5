export function formatDate(date: string) {
    return new Date(`${date}T23:59:59`);
}

export function dateToString(date: Date) : string {
    const date_w = new Date(date);

    let [year, month, day] : string[] = [date_w.getFullYear().toString(), (date_w.getMonth() + 1).toString(), date_w.getDate().toString()];

    month = String(date_w.getMonth() + 1).padStart(2, '0');
    day = String(date_w.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}