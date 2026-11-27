export type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone?: string | null;
};

// Usuário logado, guardado em memória enquanto o app estiver aberto.
let usuarioAtual: Usuario | null = null;

export function setUsuarioAtual(usuario: Usuario | null) {
  usuarioAtual = usuario;
}

export function getUsuarioAtual() {
  return usuarioAtual;
}
