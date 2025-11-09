# BIS Standards Club - Image Optimization Check Script
# This script checks your images and provides optimization recommendations

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   BIS Club Image Optimization Checker    " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$profilePath = ".\profile"

if (-not (Test-Path $profilePath)) {
    Write-Host "[ERROR] profile folder not found!" -ForegroundColor Red
    Write-Host "Make sure you are running this script from the club-website directory" -ForegroundColor Yellow
    exit
}

Write-Host "[INFO] Scanning images in profile folder..." -ForegroundColor Green
Write-Host ""

$images = Get-ChildItem -Path $profilePath -Include *.jpg,*.jpeg,*.png,*.JPG,*.JPEG,*.PNG -Recurse
$totalSize = 0
$needsOptimization = 0

Write-Host "Image Analysis:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

foreach ($image in $images) {
    $fileSizeKB = [Math]::Round($image.Length / 1KB, 2)
    $totalSize += $fileSizeKB
    
    $status = ""
    $color = "Green"
    
    # Determine if optimization needed
    if ($image.Name -like "*event*" -and $fileSizeKB -gt 150) {
        $needsOptimization++
        $status = "[WARNING] TOO LARGE (should be < 150KB)"
        $color = "Yellow"
    }
    elseif (($image.Name -notlike "*event*") -and $fileSizeKB -gt 50) {
        $needsOptimization++
        $status = "[WARNING] TOO LARGE (should be < 50KB)"
        $color = "Yellow"
    }
    else {
        $status = "[OK]"
        $color = "Green"
    }
    
    Write-Host "$($image.Name.PadRight(30)) - ${fileSizeKB}KB".PadRight(50) $status -ForegroundColor $color
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   Total Images: $($images.Count)" -ForegroundColor White
Write-Host "   Total Size: $([Math]::Round($totalSize / 1024, 2)) MB" -ForegroundColor White
Write-Host "   Need Optimization: $needsOptimization" -ForegroundColor $(if ($needsOptimization -gt 0) { "Yellow" } else { "Green" })
Write-Host ""

if ($needsOptimization -gt 0) {
    Write-Host "Recommendations:" -ForegroundColor Yellow
    Write-Host "   1. Visit https://tinypng.com" -ForegroundColor White
    Write-Host "   2. Upload the images marked with [WARNING]" -ForegroundColor White
    Write-Host "   3. Download compressed versions" -ForegroundColor White
    Write-Host "   4. Replace the original files" -ForegroundColor White
    Write-Host ""
    Write-Host "See IMAGE_OPTIMIZATION_GUIDE.md for detailed instructions" -ForegroundColor Cyan
}
else {
    Write-Host "[SUCCESS] All images are optimized! Great job!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Tip: Keep original high-quality images in a separate backup folder" -ForegroundColor Blue
Write-Host ""

# Offer to create backup
$response = Read-Host "Would you like to create a backup of your images? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupPath = ".\profile_backup_$timestamp"
    
    if (-not (Test-Path $backupPath)) {
        New-Item -ItemType Directory -Path $backupPath | Out-Null
        Copy-Item "$profilePath\*" -Destination $backupPath -Recurse
        Write-Host "[SUCCESS] Backup created at: $backupPath" -ForegroundColor Green
    }
    else {
        Write-Host "[WARNING] Backup folder already exists" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
