async function deleteProduct(id) {
  try {
    const response = await fetch(`/product/delete/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();

    if (data.success) {
      window.location.href = "/product";
    } else {
      console.error(new Error(data.message))
      alert("Erro ao excluir produto")
    }
  } catch (e) {
    console.error(e);
    alert("Erro na solicitação");
  }
}