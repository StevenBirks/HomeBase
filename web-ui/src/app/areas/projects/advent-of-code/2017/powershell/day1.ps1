$input = Get-Content ./day1-input.txt
$answer = 0
[int[]] $inputArray = @()

for ($i = 0; $i -lt $input.length; $i++) 
{
  $inputArray = $inputArray + [convert]::ToInt32($input.Substring($i,1), 10)
}

for ($i = 0; $i -lt $inputArray.length - 1; $i++) 
{
  If ($inputArray[$i] -eq $inputArray[$i+1])
  {
    $answer = $answer + $inputArray[$i]
  }
}

If ($inputArray[$inputArray.length - 1] -eq $inputArray[0])
{
  $answer = $answer + $inputArray[$inputArray.length - 1]
}

echo "Answer: $answer"