import { DataTableResponse } from '../../types/apiServiceResponse';
import { Request } from 'express';

export default interface IUniversityService {
  list: (req: Request) => Promise<DataTableResponse>;
}
