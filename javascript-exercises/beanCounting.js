function countChar(str, char) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) count++;
    }
    return count;
  }
  
  function countBs(str) {
    return countChar(str, 'B');
  }
  
  console.log(countBs("BOB"));           // Output: 2
  console.log(countChar("kakkerlak", "k")); // Output: 4
  