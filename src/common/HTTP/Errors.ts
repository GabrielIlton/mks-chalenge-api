import {
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';

export default {
  generic: {
    invalidType: ({ fieldKey, correctType }) =>
      new UnprocessableEntityException(
        `O campo ${fieldKey} deve ser do tipo ${correctType}.`,
      ),
    notPossibleValidate: ({ field }) =>
      new UnprocessableEntityException(
        `Não foi possível validar o campo ${field}.`,
      ),
    alreadyExists: ({ field }) =>
      new UnprocessableEntityException(
        `${
          field[0].toUpperCase() + field.substr(1)
        } já cadastrado(a) em nosso sistema.`,
      ),
    notExists: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${fieldKey[0].toUpperCase() + fieldKey.substr(1)} não existe.`,
      ),
    acceptOnly: ({ fieldKey, correctType }) =>
      new UnprocessableEntityException(
        `O campo ${fieldKey} aceita apenas ${correctType} em seus caracteres.`,
      ),
    missingParamError: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${fieldKey[0].toUpperCase() + fieldKey.substr(1)} é obrigatório(a).`,
      ),
    notFound: ({ entity }) =>
      new UnprocessableEntityException(
        `${entity[0].toUpperCase() + entity.substr(1)} não encontrado(a).`,
      ),
    invalidField: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${fieldKey[0].toUpperCase() + fieldKey.substr(1)} inválido(a).`,
      ),
    notExistsOnArray: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${
          fieldKey[0].toUpperCase() + fieldKey.substr(1)
        } não está disponível para ser utilizado.`,
      ),
    notAvailableType: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${
          fieldKey[0].toUpperCase() + fieldKey.substr(1)
        } não está no tipo adequado para ser utilizado.`,
      ),
    invalidLength: ({ fieldKey, valueLength }) =>
      new UnprocessableEntityException(
        `O campo ${fieldKey} deve conter ${valueLength} caracteres.`,
      ),
    invalidValue: ({ fieldKey, value, isMax = false }) =>
      new UnprocessableEntityException(
        `O campo ${fieldKey} deve possuir um valor ${
          isMax ? 'máximo' : 'mínimo'
        } de ${value}.`,
      ),
    deletedError: ({ item }) =>
      new BadRequestException(`Erro ao deletar ${item}.`),
    createdError: ({ item }) =>
      new BadRequestException(`Erro ao criar ${item}.`),
    updatedError: ({ item }) =>
      new BadRequestException(`Erro ao atualizar ${item}.`),
    registerError: ({ item }) =>
      new BadRequestException(`Erro ao cadastrar ${item}.`),
    notDeleted: ({ fieldKey }) =>
      new UnprocessableEntityException(
        `${
          fieldKey[0].toUpperCase() + fieldKey.substr(1)
        } não está deletado(a).`,
      ),
  },
};
