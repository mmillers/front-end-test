import { Publicacao } from "./publicacao.class";

export class Livro extends Publicacao {
  #ISBN!: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISBN: string) {
    super(titulo, autor, anoPublicacao);
    this.#ISBN = ISBN;
  }

  get ISBN(): string {
    return this.#ISBN;
  }

  get descricao(): string {
    return `${this.titulo}, ${this.autor}, ${this.ISBN}, ${this.anoPublicacao}`;
  }
}
