import React from "react";

type ConflictModalProps = {
  itemName: string;
  onKeepExisting: () => void;
  onAddNew: () => void;
  onClose: () => void;
};

export default function ConflictModal({
  itemName,
  onKeepExisting,
  onAddNew,
  onClose,
}: ConflictModalProps) {
  return (
    <div>
      <h2>Item Already Exists</h2>

      <p>
        <strong>{itemName}</strong> is already in your cart.
      </p>

      <button onClick={onKeepExisting}>Keep Existing</button>
      <button onClick={onAddNew}>Add New</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}