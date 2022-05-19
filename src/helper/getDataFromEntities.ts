import {Entity, TranslationData} from 'services/api.interfaces';
import {IssuesTypes} from 'services/enums';

export const getDataFromEntities = (data: TranslationData[] | any, type: IssuesTypes) => {
  let newData: any = [];

  if (data['sg-entities']) {
    data['sg-entities'].forEach((item: Entity) => {
      if (item['ui-options-for-select/type'] === type) {
        newData = item.entries;
      }
    });
  }
  return newData;
};
