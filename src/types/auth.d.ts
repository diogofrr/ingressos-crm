export interface ResponseDTO {
  error: boolean
  msgUser: string
  msgOriginal: string | null,
}

export interface LoginResponse extends ResponseDTO {
  nome: string
  jwt: string
}