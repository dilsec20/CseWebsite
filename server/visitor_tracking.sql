CREATE TABLE IF NOT EXISTS visitor_logs (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_url TEXT,
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visitor_logs_time ON visitor_logs(visit_time);
