Param(
    [int]$Port = 8000,
    [string]$Root = (Get-Location).Path
)

Add-Type -AssemblyName System.Net.HttpListener
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "A+ Writers dev server running at $prefix (root: $Root)"

function Get-ContentType($path) {
    switch ([IO.Path]::GetExtension($path).ToLower()) {
        ".html" { return "text/html" }
        ".css"  { return "text/css" }
        ".js"   { return "application/javascript" }
        ".svg"  { return "image/svg+xml" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".ico"  { return "image/x-icon" }
        default  { return "application/octet-stream" }
    }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = 'index.html' }
        $filePath = Join-Path $Root $localPath

        if (-not (Test-Path $filePath)) {
            # try directory index
            $tryIndex = Join-Path (Join-Path $Root $localPath) 'index.html'
            if (Test-Path $tryIndex) { $filePath = $tryIndex }
        }

        if (Test-Path $filePath) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = Get-ContentType $filePath
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $msg = [Text.Encoding]::UTF8.GetBytes("Not Found")
            $response.StatusCode = 404
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}