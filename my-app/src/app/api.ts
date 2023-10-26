export const getAllData = async (lat: number, lon: number): Promise<any> => {
  const res = await fetch(
    `http://localhost:3000/api?lat=${lat}&lon=${lon}`,
    { cache: "no-store"}
  );
  const data = await res.json();
  return data;
};