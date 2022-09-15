// REFERENCIA: conteudo do course da Trybe do bloco 30

enum ErrorTypes {
  EntityNotFound = 'ObjectNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number;
};

type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

const errorCatalog: ErrorCatalog = {
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};

export { ErrorTypes, ErrorResponseObject, ErrorCatalog, errorCatalog };
