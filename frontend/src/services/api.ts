import apiClient from './apiClient';

export const eventoService = {
  listar: async () => {
    const res = await apiClient.get('/eventos/');
    return res.data;
  },
  buscar: async (id: string | number) => {
    const res = await apiClient.get(`/eventos/${id}/`);
    return res.data;
  },
  criar: async (dados: any) => {
    const res = await apiClient.post('/eventos/', dados);
    return res.data;
  },
  atualizar: async (id: string | number, dados: any) => {
    const res = await apiClient.patch(`/eventos/${id}/`, dados);
    return res.data;
  },
  deletar: async (id: string | number) => {
    await apiClient.delete(`/eventos/${id}/`);
  },
  exportarRelatorioPDF: async (id: string | number) => {
    const res = await apiClient.get(`/eventos/${id}/relatorio-doacoes/`, {
      responseType: 'blob',
    });
    return res.data;
  },
}

export const doacaoService = {
  registrar: async (dados: any) => {
    const res = await apiClient.post('/doacoes/', dados);
    return res.data;
  },

  listarPorEvento: async (eventoId: string | number) => {
    const res = await apiClient.get(`/doacoes/?evento=${eventoId}`);
    return res.data;
  },

  listarMinhas: async () => {
    const res = await apiClient.get('/doacoes/');
    return res.data;
  },

  confirmar: async (id: string | number) => {
    const res = await apiClient.post(`/doacoes/${id}/confirmar/`);
    return res.data;
  },

  deletar: async (id: string | number) => {
    await apiClient.delete(`/doacoes/${id}/`);
  }
}

export const itemDoacaoService = {
  listarPorEvento: async (eventoId: string | number) => {
    const res = await apiClient.get(`/itens-doacao/?evento=${eventoId}`);
    return res.data;
  },

  criar: async (dados: any) => {
    const res = await apiClient.post('/itens-doacao/', dados);
    return res.data;
  },

  atualizar: async (id: string | number, dados: any) => {
    const res = await apiClient.patch(`/itens-doacao/${id}/`, dados);
    return res.data;
  },

  deletar: async (id: string | number) => {
    await apiClient.delete(`/itens-doacao/${id}/`);
  }
}

export const transparenciaService = {
  listar: async () => {
    const res = await apiClient.get('/transparencia/');
    return res.data;
  },
  criar: async (dados: FormData) => {
    const res = await apiClient.post('/transparencia/', dados, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  atualizar: async (id: string | number, dados: FormData) => {
    const res = await apiClient.patch(`/transparencia/${id}/`, dados, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  deletar: async (id: string | number) => {
    await apiClient.delete(`/transparencia/${id}/`);
  }
}