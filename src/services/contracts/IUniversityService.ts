import {
  ApiServiceResponse,
  DataTableResponse,
} from '../../types/apiServiceResponse';

export default interface IUniversityService {
  list: () => Promise<DataTableResponse>;
}
