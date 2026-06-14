const BASE_URL = 'http://localhost:8000/api'

export const eventoService = {
  listar: async () => {
    const res = await fetch(`${BASE_URL}/eventos/`)
    if (!res.ok) throw new Error('Erro ao listar eventos')
    return res.json()
  },

  buscar: async (id: string | number) => {
    const res = await fetch(`${BASE_URL}/eventos/${id}/`)
    if (!res.ok) throw new Error('Evento não encontrado')
    return res.json()
  },

  criar: async (dados: any) => {
    const res = await fetch(`${BASE_URL}/eventos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao criar evento')
    return res.json()
  },

  atualizar: async (id: string | number, dados: any) => {
    const res = await fetch(`${BASE_URL}/eventos/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao atualizar evento')
    return res.json()
  },

  deletar: async (id: string | number) => {
    const res = await fetch(`${BASE_URL}/eventos/${id}/`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erro ao deletar evento')
  }
}

export const doacaoService = {
  registrar: async (dados: any) => {
    const res = await fetch(`${BASE_URL}/registros-doacao/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao registrar doação')
    return res.json()
  }
}

export const itemDoacaoService = {
  listarPorEvento: async (eventoId: string | number) => {
    const res = await fetch(`${BASE_URL}/doacoes/?evento=${eventoId}`)
    if (!res.ok) throw new Error('Erro ao listar itens')
    return res.json()
  },

  criar: async (dados: any) => {
    const res = await fetch(`${BASE_URL}/doacoes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao criar item')
    return res.json()
  },

  atualizar: async (id: string | number, dados: any) => {
    const res = await fetch(`${BASE_URL}/doacoes/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!res.ok) throw new Error('Erro ao atualizar item')
    return res.json()
  },

  deletar: async (id: string | number) => {
    const res = await fetch(`${BASE_URL}/doacoes/${id}/`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Erro ao deletar item')
  }
}