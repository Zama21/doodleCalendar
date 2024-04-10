import { ModalTypes } from 'modules/modals/store/modalsSlice.js';
import { useGlobalModal } from '../useGlobalModal.js';

export const useAuthModal = () => useGlobalModal(ModalTypes.Auth);
