import SuperDao from './SuperDao';
import IUniversityDao from '../contracts/IUniversityDao';
import University from '../../models/University';

export default class UniversityDao extends SuperDao implements IUniversityDao {
  constructor() {
    super(University);
  }
}
