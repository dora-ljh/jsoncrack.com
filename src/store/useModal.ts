import { create } from "zustand";
import { Modal } from "src/containers/Modals";
import { gaEvent } from "src/lib/utils/gaEvent";

type ModalState = {
  [key in Modal]: boolean;
};

interface ModalActions {
  setVisible: (modal: Modal) => (visible: boolean) => void;
}

const initialStates: ModalState = {
  clear: false,
  download: false,
  import: false,
  node: false,
  share: false,
  jwt: false,
  schema: false,
  jq: false,
  type: false,
};

const authModals: Modal[] = [];
const premiumModals: Modal[] = [];

const useModal = create<ModalState & ModalActions>()(set => ({
  ...initialStates,
  setVisible: modal => visible => {
    set({ [modal]: visible });
  },
}));

export default useModal;
