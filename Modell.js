export default class Modell {
  #lista = [];

  constructor(lista) {
    this.#lista = lista;
  }

  getAdat(vegpont, callback) {
    fetch(vegpont)
      .then((response) => response.json())
      .then((data) => {
        this.#lista = data;
        callback(this.#lista);
      });
  }

  postAdat(vegpont, product, callback) {
    fetch(vegpont, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        this.#lista.push(data);
        callback(this.#lista);
      });
  }

  deleteAdat(vegpont, id, index, callback) {
    fetch(`${vegpont}/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.#lista.splice(index, 1);
        callback(this.#lista);
      });
  }
}
