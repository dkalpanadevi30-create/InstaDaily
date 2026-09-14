import React from "react";

type ExpressModeToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export default function ExpressModeToggle({
  enabled,
  onChange,
}: ExpressModeToggleProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      Express Mode
    </label>
  );
}