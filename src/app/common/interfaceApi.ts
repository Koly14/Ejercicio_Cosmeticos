export interface ApiResponseCosmeticos {
  cosmeticos: Cosmeticos
}

export interface Cosmeticos {
  info: Info
  cosmeticos: Cosmetico[]
}

export interface Info {
  total: number
  pages: number
}

export interface Cosmetico {
  _id: string
  name: string
  image: string
  type: string
  brand: string
  price: number
}

export interface StatusMessage {
  message: string
  error: string
  statusCode: number
}
