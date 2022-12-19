import cors from 'cors';

import { PSD_ALLOWED_ORIGINS } from '../../utils/constants.js';

const corsConfig = cors({
  origin: PSD_ALLOWED_ORIGINS,
  allowedHeaders: ['x-csrf-token'],
  methods: [
    "GET",
    "OPTINS",
    "HEAD",
    "PUT",
    "PATCH",
    "POST",
    "DELETE"
  ],
  credentials: true,
});

export default corsConfig;