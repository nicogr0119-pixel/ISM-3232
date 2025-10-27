"use client";

import { useState } from "react";

/**
* Counter Component (Accessible, Reusable)
* Props:
* - initialCount (number) default 0
* - initialStep (number) default 1
*
* Behavior:
* - Increment/Decrement by `step`
* - Reset returns to `initialCount`
* - Decrement disabled if (count - step) < 0
* - Step input (number) with min 1 and live updates
* - aria-live region announces count updates
*/

export default function Counter({ initialCount = 0, initialStep = 1 }) {
const [count, setCount] = useState(Number(initialCount) || 0);
const [step, setStep] = useState(Math.max(1, Number(initialStep) || 1));


const canDecrement = count - step >= 0;


const handleIncrement = () => setCount((c) => c + step);
const handleDecrement = () => {
if (canDecrement) setCount((c) => c - step);
};
const handleReset = () => setCount(Number(initialCount) || 0);


const handleStepChange = (e) => {
const next = Number(e.target.value);
// Clamp to minimum of 1, coerce invalid to 1
setStep(Number.isFinite(next) ? Math.max(1, Math.floor(next)) : 1);
};


return (
<div className="counter">
<div className="counter__header">
<h2>Button Counter</h2>
</div>


<div className="counter__live" aria-live="polite" aria-atomic="true">
Current count: <span className="counter__value">{count}</span>
</div>


<div className="counter__controls">
<button onClick={handleIncrement} type="button" className="btn">
+{step}
</button>


<button
onClick={handleDecrement}
type="button"
className="btn"
disabled={!canDecrement}
aria-disabled={!canDecrement}
title={canDecrement ? "Decrement count" : "Cannot go below 0"}
>
−{step}
</button>


<button onClick={handleReset} type="button" className="btn btn--reset">
Reset
</button>
</div>


<div className="counter__step">
<label htmlFor="step-input">Step</label>
<input
id="step-input"
type="number"
inputMode="numeric"
min={1}
step={1}
value={step}
onChange={handleStepChange}
/>
</div>
</div>
);
}