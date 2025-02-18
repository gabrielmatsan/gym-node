export class AppError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message)
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super('E-mail já cadastrado!', 400)
  }
}

export class UserNotFoundError extends AppError {
  constructor() {
    super('Usuário não encontrado!', 404)
  }
}
