import React from "react";

type PortionStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
};

export default function PortionStepper({
  quantity,
  onChange,
  min = 1,
  max = 20,
}: PortionStepperProps) {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div>
      <button onClick={decrease} disabled={quantity <= min}>
        −
      </button>

      <span>{quantity}</span>

      <button onClick={increase} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
}