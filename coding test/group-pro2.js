// Function to find all unique quadruplets
function fourSum(nums, target) {
  nums.sort((a, b) => a - b); // Sort the array
  const result = [];
  const n = nums.length;

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates for first number
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // Skip duplicates for second number
      let left = j + 1;
      let right = n - 1;
      while (left < right) {
        const total = nums[i] + nums[j] + nums[left] + nums[right];
        if (total === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          right--;
          // Skip duplicates for third and fourth numbers
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        } else if (total < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return result;
}

// Event listener for the button
document.getElementById("findQuadruplets").addEventListener("click", () => {
  // Get user inputs
  const nums = document.getElementById("nums").value.split(",").map(Number);
  const target = parseInt(document.getElementById("target").value);

  // Run the four-sum algorithm
  const result = fourSum(nums, target);

  // Display the result in the pre tag
  const resultElement = document.getElementById("result");
  if (result.length === 0) {
    resultElement.textContent = "No quadruplets found.";
  } else {
    resultElement.textContent = JSON.stringify(result, null, 2); // Pretty-print the result
  }
});
