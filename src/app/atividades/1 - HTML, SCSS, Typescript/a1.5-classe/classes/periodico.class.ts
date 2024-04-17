import { Publicacao } from "./publicacao.class";

export class Periodico extends Publicacao {
  #ISSN!: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISSN: string) {
    super(titulo, autor, anoPublicacao);
    this.#ISSN = ISSN;
  }

  get ISSN(): string {
    return this.#ISSN;
  }

  get descricao(): string {
    return `${this.titulo}, ${this.autor}, ${this.ISSN}, ${this.anoPublicacao}`;
  }
}
