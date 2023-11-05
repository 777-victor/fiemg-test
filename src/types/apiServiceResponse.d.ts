export declare type ApiServiceResponse = {
  code: number;
  message: string;
  data?: [] | object | null | undefined;
};

export declare type DataTableResponse = {
  totalItems: number;
  data: Partial<object[]>;
  totalPages: number;
  currentPage: number;
};

export declare type DataTableDaoResponse = {
  count: number;
  rows: Partial<object[]>;
};
