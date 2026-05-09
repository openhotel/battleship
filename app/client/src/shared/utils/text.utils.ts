export const getTextFirstLetterUpperCase = (text: string) => {
  const textArray = text.split("");
  return textArray[0].toUpperCase() + text.substring(1, text.length);
};
