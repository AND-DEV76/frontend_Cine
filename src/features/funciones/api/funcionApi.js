const BASE_URL = "http://localhost:8080/api/funciones";

export const getFunciones = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createFuncion = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Error al crear función");
  }

  return result;
};

export const deleteFuncion = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};