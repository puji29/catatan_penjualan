@echo off
cd E:\proyek\javascript\catatan_penjualan
start npm run dev
timeout /t 5
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" http://localhost:3000
pause
