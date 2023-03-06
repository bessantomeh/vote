import { roles } from './../../middlewear/auth.js';

export const endpoint={
    createpost:[roles.Admin,roles.user]
}
