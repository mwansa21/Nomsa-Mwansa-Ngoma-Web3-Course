function isEven(n) {
    if (n < 0) n = -n;
    if (n === 0) return true;
    else if (n === 1) return false;
    else return isEven(n - 2);
  }
  
  console.log(isEven(50));  // Output: true
  console.log(isEven(75));  // Output: false
  console.log(isEven(-1));  // Output: false
  