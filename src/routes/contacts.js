import {Router} from 'express';
import { addContactController, deleteContactByIdController, getContact, getContactsAllController, patchContactByIdController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsAllController));

contactRouter.get('/:contactId', ctrlWrapper(getContact));

contactRouter.post('/', ctrlWrapper(addContactController));

contactRouter.patch('/:contactId', ctrlWrapper(patchContactByIdController));

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));




export default contactRouter;