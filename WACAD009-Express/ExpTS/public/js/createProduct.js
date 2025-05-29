const form = document.getElementById("createProdutoForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const product = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock"))
  };

  try {
    const response = await fetch("/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = `/product/${data.data.id}`;
    } else {
      console.error(new Error(data.message))
      alert("Erro ao criar Produto");
    }
  } catch (e) {
    console.error(e);
    alert("Erro na solicitação");
  }
});