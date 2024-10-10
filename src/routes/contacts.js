import {Router} from 'express';
import { addContactController, deleteContactByIdController, getContact, getContactsAllController, patchContactByIdController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addContactValidationShema } from '../validations/addContactValidationShema.js';
import { patchContactValidationShema } from '../validations/patchContactVakidationShema.js';
import { authentificate } from '../middlewares/authentificate.js';

const contactRouter = Router();

contactRouter.use('/:contactId', isValidId("contactId"));

contactRouter.use('/', authentificate);

contactRouter.get('/', ctrlWrapper(getContactsAllController));

contactRouter.get('/:contactId', ctrlWrapper(getContact));

contactRouter.post('/', validateBody(addContactValidationShema), ctrlWrapper(addContactController));

contactRouter.patch('/:contactId', validateBody(patchContactValidationShema), ctrlWrapper(patchContactByIdController));

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactRouter;
