export default function validateEmail(input: string) {
  // This regex accepts spaces, letters and all the digits
  const lettersAndNumbers = /@/;
  console.log(lettersAndNumbers.test(input));
  return lettersAndNumbers.test(input) && input.length <= 50;
}
