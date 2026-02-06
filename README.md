# ⚡ PleadsC - Power Lead Capture CRM

CRM capturador de leads usando a **Google Places API** (via Maps JavaScript API). Busque empresas por cidade, estado e bairro, gerencie status, adicione comentários e sincronize com o **Supabase**.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)

---

## 📸 Features

- 🔍 **Busca por Google Places** — Text Search + Place Details direto no navegador (sem proxy)
- 📍 **Filtro por Estado, Cidade e Bairro** — bairros multiplicam buscas para superar o limite de 60 resultados
- 📊 **Pipeline de Status** — Novo, Contatado, Negociando, Convertido, Perdido (customizável)
- 💬 **Comentários por lead** — adicione anotações em cada lead
- 🗂️ **Filtros na aba Leads** — por status, estado, cidade e texto livre
- 📤 **Exportar CSV** — exporte todos os leads
- 🗄️ **Supabase Sync** — persista leads no PostgreSQL
- 🎨 **Interface dark mode** — design moderno e responsivo

---

## 🚀 Setup Rápido

### 1. Clone e instale

```bash
git clone https://github.com/SEU_USUARIO/PleadsC.git
cd PleadsC
npm install
```

### 2. Rode o app

```bash
npm run dev
```

Acesse: **http://localhost:5173**

### 3. Configure no app

1. Vá em **Config → Google Places API**
2. Cole sua API Key
3. Pronto! Comece a buscar leads

---

## 🔑 Configuração da Google API

1. Acesse [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Crie um projeto (ou use um existente)
3. Habilite as APIs:
   - **Maps JavaScript API** (obrigatório)
   - **Places API** (obrigatório)
4. Crie uma credencial (API Key)
5. Cole na configuração do app

### 🔒 Segurança

No Google Cloud Console, restrinja sua API Key por **HTTP referrer** (domínio do seu site) para evitar uso indevido.

> ✅ Esta versão usa a **Maps JavaScript API + Places Library** que funciona direto no navegador, sem necessidade de backend proxy.

---

## 🗄️ Configuração do Supabase (Opcional)

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **SQL Editor** e execute:

```sql
CREATE TABLE leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  place_id TEXT UNIQUE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  international_phone TEXT,
  website TEXT,
  rating REAL,
  reviews_count INTEGER,
  types JSONB DEFAULT '[]',
  status TEXT DEFAULT 'new',
  comments JSONB DEFAULT '[]',
  latitude REAL,
  longitude REAL,
  business_status TEXT,
  price_level INTEGER,
  search_state TEXT,
  search_city TEXT,
  search_neighborhood TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON leads
  FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_leads_place_id ON leads(place_id);
```

4. Configure no app: **Config → Supabase** com URL e chave anon

---

## 📁 Estrutura

```
PleadsC/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx            # Aplicação principal
│   └── main.jsx           # Entry point React
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Tecnologias

- **React 18** — UI
- **Vite 5** — Build tool
- **Google Maps JavaScript API** — Busca de leads (sem proxy)
- **Supabase** — Banco de dados PostgreSQL

---

## 📝 Licença

MIT
