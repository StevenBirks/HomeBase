$input = Get-Content ./day9-5-input.txt
$Global:answer = 0
$Global:iteration = 0;
$Global:players = New-Object System.Collections.ArrayList($null)
$Global:biggestMarble = [int]$input.split(' ')[6]
$Global:marbles = New-Object System.Collections.ArrayList($null)
$Global:currentMarblePosition = $null;
$Global:currentPlayer = $null;
$Global:playerIteration = 0;

function iterate([int] $iterate) {
    placeMarble($iterate)
    iterateCurrentPlayer

    If ($iterate -lt $Global:biggestMarble + 1)
    {
        $Global:iteration = $iterate

        If ($iterate % 100 -eq 0) {
            echo "iterate: " $iterate
        }

        iterate($iterate + 1)
    }
    Else 
    {
        $GLobal:answer = findMaxPlayerScore
    }
}

function placeMarble([int] $value) {
    If ($value -ne 0 -and $value % 23 -eq 0) {
        $Global:currentPlayer.Score += $value
        removeMarble
    }
    Else 
    {
        positionMarble($value)
    }
}

function positionMarble([int] $value) {
    If ($value -eq 0)
    {
        $Global:marbles.Add($value)
        $Global:currentMarblePosition = 0
    }
    Else 
    {
        If ($Global:currentMarblePosition -eq ($Global:marbles.Count - 1))
        {
            If ($Global:marbles.Count -eq 1)
            {
                $Global:marbles.Add($value)
            }
            Else 
            {
                $Global:marbles.Insert(1, $value)
            }

            $Global:currentMarblePosition = 1
        }
        Else
        {
            If ($Global:marbles.Count -eq $Global:currentMarblePosition + 1)
            {
                $Global:marbles.Add($value)
            }
            Else 
            {
                $Global:marbles.Insert($Global:currentMarblePosition + 2, $value)
            }

            $Global:currentMarblePosition += 2
        }
    }
}

function removeMarble(){
    $index = 0
    If ($Global:currentMarblePosition -gt 5) 
    {
        $index = $Global:currentMarblePosition - 7
    }
    Else 
    {
        $index = $Global:marbles.Count + $Global:currentMarblePosition - 7
    }

    removeMarbleAtIndex($index)

    $Global:currentMarblePosition = $index
}

function removeMarbleAtIndex([int] $index)
{
    $Global:currentPlayer.Score += $Global:marbles[$index]
    $Global:marbles.RemoveAt($index)
}

function iterateCurrentPlayer() {
    If ($Global:currentPlayer.Ref -eq ($Global:players.Count - 1))
    {
        $Global:currentPlayer = $Global:players[0]
    }
    Else
    {
        $Global:currentPlayer = $Global:players[$Global:currentPlayer.Ref + 1]
    }
}

function findMaxPlayerScore() {
    $highestScore = 0

    $Global:players.ForEach( {
        If ($_.Score -gt $highestScore)
        {
            $highestScore = $_.Score
        }
    })

    return $highestScore
}


# Start Program Run Here

for ($i = 0; $i -lt $input.split(' ')[0]; $i++) 
{
      $Global:players.Add([Player]@{
        Ref = $Global:playerIteration
        Score = 0
    })

    $Global:playerIteration++
}

$Global:currentPlayer = $Global:players[0]

iterate(0)

echo "Answer: $Global:answer"

class Player 
{
   [int]$Ref
   [int]$Score
}