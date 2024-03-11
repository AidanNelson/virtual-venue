import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState, useContext, useReducer } from "react";
import { TextField, Box } from "@mui/material";

import { StageContext } from "../StageContext";
// import { filesReducer, setFiles } from '../ScriptObject/filesReducer';
// import { initialState } from '../ScriptObject/files';

export const ScriptEditor = ({ scriptableObjectData, setEditorStatus }) => {
  const editorRef = useRef();

  // const [state, dispatch] = useReducer(filesReducer, [], scriptableObjectData.files);
  const [files, setFiles] = useState(scriptableObjectData.files);

  // const [localData, setLocalData] = useState(scriptableObjectData);
  const [activeFile, setActiveFile] = useState(null);
  const [activeFileIndex, setActiveFileIndex] = useState(1);
  const [scriptName, setScriptName] = useState(
    scriptableObjectData.name
      ? scriptableObjectData.name
      : scriptableObjectData.id,
  );

  const { stageId, editors } = useContext(StageContext);

  // useEffect(() => {
  //   setLocalData(scriptableObjectData);
  // }, [scriptableObjectData]);

  useEffect(() => {
    scriptableObjectData.name = scriptName;
  }, [scriptName]);

  // useEffect(() => {
  //   if (localData?.files?.length) {
  //     setActiveFile(localData.files[activeFileIndex]);
  //   }
  // });

  useEffect(() => {
    setActiveFile(files[activeFileIndex]);
  }, [files, activeFileIndex]);

  const updateLocalValues = () => {
    console.log("updating local values");
    const editorContent = editorRef.current.getModel().getValue(2);

    activeFile.content = editorContent;
    // console.log("current file: ", activeFile);
    // console.log("current value:", val);
    // activeFile.content = val;
  };

  const formatCode = () => {
    editorRef.current.getAction("editor.action.formatDocument").run();
  };

  const saveToDb = async () => {
    // const activeModels = editorRef.current;
    // console.log("active models:", activeModels);
    console.log("sending feature update to server", scriptableObjectData);

    const updatedFeatureInfo = scriptableObjectData;
    scriptableObjectData.files = files;
    const res = await fetch(`/api/stage/${stageId}/updateFeature`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedFeatureInfo: scriptableObjectData }),
    });
    console.log("update feature response?", res);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            onClick={() => {
              setEditorStatus({
                target: null,
                panel: "menu",
              });
            }}
          >
            Back
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <input
            placeholder="New Script Name"
            value={scriptName}
            onChange={(event) => {
              setScriptName(event.target.value);
            }}
          />
          <button
            onClick={() => {
              saveToDb();
            }}
          >
            Save/Refresh
          </button>
          <button onClick={formatCode}>Format</button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {files.map((file, index) => {
            if (file.name === "root") return null;
            return (
              <>
                <button
                  // disabled={fileType === file.name}
                  onClick={() => setActiveFileIndex(index)}
                >
                  {file.name}
                </button>
              </>
            );
          })}
        </div>

        {activeFile && (
          <Editor
            onMount={handleEditorDidMount}
            height="100%"
            width="100%"
            path={activeFile.name}
            defaultLanguage={activeFile.language}
            defaultValue={activeFile.content}
            onChange={updateLocalValues}
          />
        )}
      </div>
    </>
  );
};
