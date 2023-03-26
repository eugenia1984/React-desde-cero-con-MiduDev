const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

// Con RES - THEN
// export const getRandomFact = () => {
//   return fetch(CAT_ENDPOINT_RANDOM_FACT)
//     .then((res) => res.json()) // Handle error if !res.ok
//     .then((data) => {
//       const { fact } = data;
//       return fact;
//     });
// };

// Con ASYNC - AWAIT
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json() // Handle error if !res.ok
  const { fact } = data;
  return fact;
};