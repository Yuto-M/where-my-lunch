export const getAllData = async (): Promise<any> => {
  const res = await fetch(
    `http://localhost:3000/api`,
    { cache: "no-store"}
  );
  const data = await res.json();
  return data;
};