export const getAllData = async (lat: number, lon: number): Promise<any> => {
  const res = await fetch(
    // TODO: port動的にできたらいいけどやり方がわからない
    `http://localhost:3001/api?lat=${lat}&lon=${lon}`,
    { cache: "no-store"}
  );
  const data = await res.json();
  return data;
};