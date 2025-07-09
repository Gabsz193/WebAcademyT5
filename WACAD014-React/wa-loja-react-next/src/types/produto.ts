export interface Produto {
  id: string;
  fotos: {
    titulo: string;
    src: string;
  }[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
}