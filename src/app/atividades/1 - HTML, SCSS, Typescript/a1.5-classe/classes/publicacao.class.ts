export class Publicacao {
  #titulo!: string;
  #autor!: string;
  #anoPublicacao!: number

  constructor(titulo: string, autor: string, anoPublicacao: number) {
    this.#titulo = titulo;
    this.#autor = autor;
    this.#anoPublicacao = anoPublicacao;
  }

  get titulo(): string {
    return this.#titulo;
  }

  get autor(): string {
    return this.#autor;
  }

  get anoPublicacao(): number {
    return this.#anoPublicacao;
  }

  get descricao(): string {
    return `${this.titulo}, ${this.autor}, ${this.anoPublicacao}`;
  }
}
