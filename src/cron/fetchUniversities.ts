import Country from '@models/Country';
import University from '@models/University';
import axios from 'axios';
import { logger } from '../helpers/logger';

interface UniversitySearchResponse {
  'state-province': string | null;
  web_pages: string[] | null;
  alpha_two_code: string | null;
  name: string;
  domains: string[] | null;
  country: string;
}

export const fetchUniversities = async () => {
  const response = await axios.get('http://universities.hipolabs.com/search');
  const universities: UniversitySearchResponse[] = response.data;

  for (const university of universities) {
    let country = await Country.findOne({
      where: { name: university.country },
    });

    if (!country) {
      country = await Country.create({
        name: university.country,
        alphaTwoCode: university.alpha_two_code,
      });
    } else {
      if (country.alphaTwoCode != university.alpha_two_code) {
        await country.update({ alphaTwoCode: university.alpha_two_code });
      }
    }

    let universitySaved = await University.findOne({
      where: {
        name: university.name,
      },
    });

    let domain = null;
    let stateProvince = university['state-province'] ?? null;
    if (university.domains && university.domains.length > 0) {
      domain = university.domains[0];
    }
    let webPage = null;
    if (university.web_pages && university.web_pages.length > 0) {
      domain = university.web_pages[0];
    }

    if (!universitySaved) {
      await University.create({
        name: university.name,
        domain: domain,
        webPage: webPage,
        stateProvince: stateProvince,
        countryId: country.id,
      });
    } else {
      let attributesToUpdate: any = {};

      if (universitySaved.name != university.name) {
        attributesToUpdate.name = university.name;
      }

      if (universitySaved.name != domain) {
        attributesToUpdate.domain = domain;
      }

      if (universitySaved.webPage != webPage) {
        attributesToUpdate.webPage = webPage;
      }

      if (universitySaved.stateProvince != stateProvince) {
        attributesToUpdate.stateProvince = stateProvince;
      }

      if (attributesToUpdate) {
        await universitySaved.update(attributesToUpdate);
      }
    }
  }
};
