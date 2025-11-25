const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function dumpSchema() {
    try {
        console.log('Extracting schema from local database...');

        // Get all tables
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);

        let schema = '-- Auto-generated schema from local database\n\n';

        for (const table of tablesResult.rows) {
            const tableName = table.table_name;
            console.log(`Processing table: ${tableName}`);

            // Get columns for this table
            const columnsResult = await pool.query(`
                SELECT 
                    column_name, 
                    data_type, 
                    character_maximum_length,
                    column_default,
                    is_nullable
                FROM information_schema.columns
                WHERE table_name = $1
                ORDER BY ordinal_position
            `, [tableName]);

            schema += `-- ${tableName}\n`;
            schema += `CREATE TABLE ${tableName} (\n`;

            const columns = columnsResult.rows.map(col => {
                let def = `    ${col.column_name} `;

                if (col.data_type === 'character varying') {
                    def += `VARCHAR(${col.character_maximum_length || 255})`;
                } else if (col.data_type === 'uuid') {
                    def += 'UUID';
                } else if (col.data_type === 'integer') {
                    def += 'INTEGER';
                } else if (col.data_type === 'text') {
                    def += 'TEXT';
                } else if (col.data_type === 'boolean') {
                    def += 'BOOLEAN';
                } else if (col.data_type === 'timestamp without time zone') {
                    def += 'TIMESTAMP';
                } else {
                    def += col.data_type.toUpperCase();
                }

                if (col.column_default) {
                    if (col.column_default.includes('nextval')) {
                        // It's a SERIAL
                        def = `    ${col.column_name} SERIAL`;
                    } else {
                        def += ` DEFAULT ${col.column_default}`;
                    }
                }

                if (col.is_nullable === 'NO' && !col.column_default?.includes('nextval')) {
                    def += ' NOT NULL';
                }

                return def;
            });

            schema += columns.join(',\n');
            schema += '\n);\n\n';
        }

        fs.writeFileSync('server/schema_dump.sql', schema);
        console.log('✅ Schema dumped to server/schema_dump.sql');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        pool.end();
    }
}

dumpSchema();
