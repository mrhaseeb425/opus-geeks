// Row numbering shared by every numbered list on the site (services, values,
// process, FAQs, the blog index and the portfolio grid), so 01, 02, 03… is
// formatted the same way everywhere.
export const rowNumber = (index) => String(index + 1).padStart(2, "0");
