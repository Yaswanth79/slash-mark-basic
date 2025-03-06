import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  const executeCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        language,
        code,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(error.response.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Online Code Editor</h1>
      <div>
        <label>Select Language: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={(newCode) => setCode(newCode)}
        value={code}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        height="400px"
        width="100%"
      />
      <button onClick={executeCode}>Run Code</button>
      <h2>Output:</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default App;