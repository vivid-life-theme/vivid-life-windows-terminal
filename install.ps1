# Installs all 24 Vivid Life color schemes into Windows Terminal via a
# JSON Fragment Extension — no hand-editing of settings.json required.
# Run from a clone of this repo: .\install.ps1
# https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions

$ErrorActionPreference = "Stop"

$scriptDir = $PSScriptRoot
$source = Join-Path $scriptDir "dist\vivid-life-windows-terminal.json"
$targetDir = Join-Path $env:LOCALAPPDATA "Microsoft\Windows Terminal\Fragments\VividLifeTheme"
$target = Join-Path $targetDir "vivid-life-windows-terminal.json"

if (-not (Test-Path $source)) {
    Write-Error "Fragment not found at $source — run 'npm run build' first."
    exit 1
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
Copy-Item -Force -Path $source -Destination $target

$schemeCount = (Get-Content $source -Raw | ConvertFrom-Json).schemes.Count
Write-Host "Installed $schemeCount Vivid Life color schemes to $target"
Write-Host "Restart Windows Terminal, then pick one under Settings -> Color schemes"
Write-Host "(or per-profile under Settings -> <profile> -> Appearance -> Color scheme)."
# Windows PowerShell 5.1 reads this BOM-less file as ANSI, so the scheme
# name's middle dot is built from its code rather than typed.
$dot = [char]0x00B7
Write-Host "Default: Vivid Life $dot Midnight $dot Purple"
