param (
    [string]$RootPath = ".",
    [string[]]$ExcludeFolders = @("node_modules","public")
)

function Show-FolderTree {
    param (
        [string]$Path,
        [string[]]$ExcludeFolders,
        [string]$Indent = ""
    )

    # Get all subdirectories except the excluded ones
    $dirs = Get-ChildItem -Path $Path -Directory | Where-Object { $ExcludeFolders -notcontains $_.Name }
    # Get all files in the current folder
    $files = Get-ChildItem -Path $Path -File

    # Print folders first and recurse
    foreach ($dir in $dirs) {
        Write-Host "$Indent+- $($dir.Name)/"   # Add / to indicate folder
        Show-FolderTree -Path $dir.FullName -ExcludeFolders $ExcludeFolders -Indent ("$Indent|  ")
    }

    # Print files
    foreach ($file in $files) {
        Write-Host "$Indent+- $($file.Name)"
    }
}

# Run the function on the root path
Show-FolderTree -Path $RootPath -ExcludeFolders $ExcludeFolders
