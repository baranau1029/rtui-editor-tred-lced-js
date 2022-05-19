import {create} from 'apisauce';
const {config} = require(`./env/env.${process.env.REACT_APP_BUILD_ENV}`);

export const API = create({
  baseURL: config.baseURL,
  headers: {
    Authentication:
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNjc2YzI4YTgtNzRhZC00ZDZhLWEyNzAtNDdjOTc5NzFjZDA1IiwiZXhwIjoxNjUwMDQ2MzI3fQ.RJD9egJYgODcLK54fSDg4iQjPMMfOW2qLQ917-OGO9I',
    'X-Key-Inflection': 'dash',
  },
});
