"use client";

import { useEffect, useState, useRef, useContext, useCallback } from "react";

import { ScriptEditor } from "./ScriptEditor";
import { createDefaultScriptableObject } from "../../../shared/defaultDBEntries";
import { updateFeature } from "../db";
import { StageContext } from "../StageContext";
// import { Sortable } from "./Sortable";
// import {verticalListSortingStrategy} from "@dnd-kit/sortable"
import { StageView } from "../../app/stage/[stageId]/page";
import { useResize } from "../../hooks/useResize";

export const Editor = ({ stageInfo }) => {
  const { width: panelWidth, enableResize: enableWidthResize } = useResize({
    initialWidth: 400,
    minWidth: 200,
  });

  const { height: panelHeight, enableResize: enableHeightResize } = useResize({
    initialHeight: 200,
    minHeight: 25
  });

  useEffect(() => {
    console.log(panelHeight);
  },[panelHeight])
  const boxRef = useRef();
  const [editorStatus, setEditorStatus] = useState({
    target: null,
    panel: "menu",
  });
  // const stageInfo = useContext(StageContext);
  useEffect(() => {
    console.log("stageInfo  in Editor Component: ", stageInfo);
  }, [stageInfo]);

  const [editorOpen, setEditorOpen] = useState(false);

  const toggleEditorShown = useCallback(() => {
    setEditorOpen(!editorOpen);
  }, [editorOpen]);

  const Checkbox = ({ initialValue, onChange }) => {
    const [checked, setChecked] = useState(initialValue);

    useEffect(() => {
      onChange(checked);
    }, [checked, onChange]);

    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
    );
  };

  const addScriptableObject = async () => {
    const updatedStageDoc = stageInfo;
    updatedStageDoc.features.push(createDefaultScriptableObject());
    console.log("Sending updated stage info: ", updatedStageDoc);
    const res = await fetch(`/api/stage/${stageInfo.stageId}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedStageDoc }),
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: "1",
          }}
        >
          {editorStatus.panel === "scriptEditor" && (
            <div
              style={{
                width: panelWidth,
                height: "100%",
                backgroundColor: "lightgreen",
                position: "relative",
              }}
            >
              <ScriptEditor
                scriptableObjectData={stageInfo.features[editorStatus.target]}
                setEditorStatus={setEditorStatus}
              />
              {/* this is for resizing drawer */}
              <div
                style={{
                  position: "absolute",
                  width: "12px",
                  top: "0",
                  right: "-1px",
                  bottom: "0",
                  cursor: "col-resize",
                }}
                onMouseDown={enableWidthResize}
              />
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: "1",
              position: "relative",
            }}
          >
            <StageView stageInfo={stageInfo} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: "1",
              position: "relative",
            }}
          >
            <StageView stageInfo={stageInfo} />
          </div>
        </div>
        {editorOpen && editorStatus.panel === "menu" && (
          <div
            style={{
              backgroundColor: "lightgreen",
              width: "100%",
              height: panelHeight,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "yellow",
                height: "12px",
                top: "0",
                left: "0",
                cursor: "row-resize",
              }}
              onMouseDown={enableHeightResize}
            ></div>
            <div
              style={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  flexGrow: "1",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong>Scenes</strong>
                <div>
                  <button>Scene 1</button>
                </div>
                <div>
                  <button>Scene 2</button>
                </div>
                <div>
                  <button>Scene 3</button>
                </div>
              </div>
              <div
                style={{
                  flexGrow: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "",
                }}
              >
                <strong>Interactables</strong>
                <button onClick={addScriptableObject}>
                  Add Scriptable Object
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "",
                  }}
                >
                  {stageInfo.features.map((feature, index) => {
                    if (feature.type === "scriptableObject") {
                      return (
                        <div key={index}>
                          {feature.name ? feature.name : feature.id}
                          <button
                            onClick={() => {
                              console.log("clicked");
                              setEditorStatus({
                                panel: "scriptEditor",
                                target: index,
                              });
                            }}
                          >
                            Edit
                          </button>

                          <input
                            type="checkbox"
                            checked={feature.active}
                            onChange={(e) => {
                              console.log(e);
                              updateFeature(stageInfo.stageId, {
                                ...feature,
                                active: !feature.active,
                              });
                            }}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div
                style={{
                  flexGrow: "1",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong>Settings</strong>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor: "lightgrey",
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <button onClick={toggleEditorShown}>EDIT</button>

          {/* <button onClick={() => setShowShareModal(true)}>SHARE</button> */}
        </div>
      </div>
    </>
  );
};
