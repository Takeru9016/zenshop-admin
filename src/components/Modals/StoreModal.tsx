"use client";

import Modal from "@/components/Modals/Modal";
import { useStoreModal } from "@/hooks/useStoreModal";

export default function StoreModal() {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Store Form Here
    </Modal>
  );
}
