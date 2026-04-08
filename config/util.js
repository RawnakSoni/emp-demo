const buildUpdateQuery = (table, data, where) => {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
    });

    const whereClause = [];
    Object.entries(where).forEach(([key, value]) => {
        whereClause.push(`${key} = ?`);
        values.push(value);
    });

    const query = `
    UPDATE ${table}
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE ${whereClause.join(" AND ")}
  `;
    return { query, values };
}

module.exports = buildUpdateQuery;