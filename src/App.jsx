import { useState } from "react";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 40px;
  color: red;
`;
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <H1>Vite + React</H1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
