$input = Get-Content ./day13-5-input.txt
$Global:firewalls = @{}
$Global:delay = 3861700
$Global:currentDepth = 0
$Global:detected = $false

function incrementScanners () {
  $Global:firewalls.keys | % {
    If ($Global:firewalls.Item($_).scannerDirection -eq 0) {
      If ($Global:firewalls.Item($_).scannerPosition -eq ($Global:firewalls.Item($_).range)) {
        $Global:firewalls.Item($_).scannerPosition--
        $Global:firewalls.Item($_).scannerDirection = 1
      }
      Else {
        $Global:firewalls.Item($_).scannerPosition++
      }
    }
    Else {
      If ($Global:firewalls.Item($_).scannerPosition -ne 0) {
        $Global:firewalls.Item($_).scannerPosition--
      }
      Else {
        $Global:firewalls.Item($_).scannerPosition++
        $Global:firewalls.Item($_).scannerDirection = 0   
      }
    }
  }
}

function run () {  
  While ($Global:detected -eq $false -and
         $Global:currentDepth -lt 92) {

    If ($Global:firewalls.ContainsKey($Global:currentDepth)) {
      If ($Global:firewalls.Item($Global:currentDepth).scannerPosition -eq 0) {
        $Global:detected = $true
        if ($Global:delay % 1000 -eq 0) {
          Write-Host ("Detected. Delay: $Global:delay, Firewalldepth: $Global:currentDepth")
        }
      }
    }

    If ($Global:detected -eq $false) {
      incrementScanners
      $Global:currentDepth++      
    }
  }
}

function initialiseScanners () {
  $Global:firewalls.Keys | % {
    $rem = $Global:delay % (2 * $Global:firewalls.Item($_).Range)

    If ($rem -lt $Global:firewalls.Item($_).Range) {
      $Global:firewalls.Item($_).scannerDirection = 0
      $Global:firewalls.Item($_).scannerPosition = $rem
    }
    Else {
      $Global:firewalls.Item($_).scannerDirection = 1
      $Global:firewalls.Item($_).scannerPosition = (2 * $Global:firewalls.Item($_).Range) - $rem
    }
  }
}

# Start Program here

$input -split '\n' | ForEach {
  $line = $_ -split ': '

  $Global:firewalls.Add([convert]::ToInt32($line[0]), [Firewall]@{
    Range = [convert]::ToInt32($line[1]) - 1
    ScannerPosition = 0
    ScannerDirection = 0
  })
}

While ($Global:currentDepth -ne 92) {
  $Global:currentDepth = 0
  $Global:detected = $false

  initialiseScanners

  #Measure-command {
    run
  #}
  $Global:delay = $Global:delay + 2
}

Write-Host ("`nfirewalls: $($Global:firewalls | Format-Table | Out-String)" )
Write-Host ("`nanswer: $($Global:delay - 2)") 

class Firewall
{
   [int]$Range
   [int]$ScannerPosition
   [Direction]$ScannerDirection
}

enum Direction
{
  Down = 0
  Up = 1
}

# for ($i=0; $i -le 10000; $i++) {
#  $percent = [math]::Floor($i/100)
#   #Write-Host -NoNewLine "`r => $percent% complete"
# }