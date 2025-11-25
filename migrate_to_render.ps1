# Migration script: Local PostgreSQL to Render Postgres
# This script migrates your local placement_prep database to Render

# Local database credentials
$LOCAL_PASSWORD = "dilip"
$LOCAL_HOST = "localhost"
$LOCAL_PORT = "5432"
$LOCAL_USER = "postgres"
$LOCAL_DB = "placement_prep"

# Render database URL
$RENDER_DB_URL = "postgresql://placement_prep_user:5BzUiBiTbPL8WEwQJdzEgcBIiGbqmxs7@dpg-d4ib377diees73aag370-a.singapore-postgres.render.com/placement_prep"

# PostgreSQL bin directory
$PG_BIN = "C:\Program Files\PostgreSQL\18\bin"

# Check if PostgreSQL tools exist
if (-not (Test-Path "$PG_BIN\pg_dump.exe")) {
    Write-Host "Error: pg_dump.exe not found at $PG_BIN" -ForegroundColor Red
    exit 1
}

Write-Host "Starting database migration..." -ForegroundColor Cyan
Write-Host "Source: $LOCAL_HOST/$LOCAL_DB" -ForegroundColor Gray
Write-Host "Destination: Render Postgres" -ForegroundColor Gray
Write-Host ""

# Set local password as environment variable
$env:PGPASSWORD = $LOCAL_PASSWORD

# Create dump file
$DUMP_FILE = "local_dump_$(Get-Date -Format 'yyyyMMdd_HHmmss').sql"

Write-Host "Step 1: Dumping local database to $DUMP_FILE..." -ForegroundColor Cyan
# Use --no-password to force failure if password is wrong
# Use --clean --if-exists to drop existing tables in target (when imported)
& "$PG_BIN\pg_dump.exe" -h $LOCAL_HOST -p $LOCAL_PORT -U $LOCAL_USER -d $LOCAL_DB --clean --if-exists -f "$DUMP_FILE" --no-password

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to dump local database" -ForegroundColor Red
    exit 1
}

Write-Host "Local database dumped successfully" -ForegroundColor Green
if (Test-Path $DUMP_FILE) {
    $fileSize = (Get-Item $DUMP_FILE).Length / 1MB
    Write-Host "File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Gray
}
Write-Host ""

Write-Host "Step 2: Importing to Render Postgres..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Gray

# Clear password and use Render URL (which contains password)
$env:PGPASSWORD = $null

# Use explicit -d for connection string to avoid ambiguity
& "$PG_BIN\psql.exe" -d "$RENDER_DB_URL" -f "$DUMP_FILE"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to import to Render database" -ForegroundColor Red
    Write-Host "The dump file has been saved: $DUMP_FILE" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Migration completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test your backend: https://csewebsiteplacement-prep-backend.onrender.com/api/problems" -ForegroundColor Gray
Write-Host "2. Test your frontend: https://placement-prep-frontend.onrender.com" -ForegroundColor Gray
Write-Host "3. If everything works, you can delete: $DUMP_FILE" -ForegroundColor Gray
Write-Host ""
Write-Host "Your production database now has all your local data!" -ForegroundColor Green
