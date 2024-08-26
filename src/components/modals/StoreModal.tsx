"use client";

import Modal from "../Modal";
import { useStoreModal } from "@/hooks/useStoreModal";

export default function StoreModal() {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Your Shop"
      description="Add a new shop to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Shop Form
    </Modal>
  );
}
