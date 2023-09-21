// Goal is to focus a text input component after selecting a button
// Try to do it without using a forwardRef to motivate the function
"use client";
import {useState} from 'react';

const Loading = ({title}) => {
  const [percentage, setPercentage] = useState(0);

  // what do we use in react to increment state according to time
  // setInterval (when do we do clearInterval?)
  // useEffect to trigger?

  return (
    <div>
      <label className="pr-2" htmlFor="first">
        <b>{title}:</b>
      </label>
      <progress id="first" value={percentage} />
    </div>
  );
};

const TestComponent = () => {
  return (
    <div>
      <Loading title="Food" />
      <Loading title="Feed me" />
    </div>
  );
};

export default TestComponent;
