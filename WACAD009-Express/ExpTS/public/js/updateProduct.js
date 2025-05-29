document
  .getElementById("updateProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    try {
      if(name === null || price === null || stock === null) {
        throw new Error("Preencha todos os parâmetros");
      }

      const response = await fetch(`/product/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          name,
          price: Number(price),
          stock: Number(stock)
        })
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = `/product/${id}`;
      } else {
        console.error(data.message)
        alert("Erro ao atualizar produto");
      }
    } catch (e) {
      console.error(e);
      alert("Erro na solicitação");
    }
  });
