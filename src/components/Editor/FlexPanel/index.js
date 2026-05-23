import { useState } from "react";
import styles from "./FlexPanel.module.scss";
import Typography from "@/components/Typography";
import { Button } from "@/components/Button";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { AssetMangementPanel } from "@/components/Editor/AssetManagementPanel";
import { useStageContext } from "@/components/StageContext";
import { supabase } from "@/components/SupabaseClient";

import debug from "debug";
const logger = debug("broadcaster:flexPanel");

const ActionsPanel = () => {
  const { stageInfo } = useStageContext();

  const updateStageFlag = (field, value) => {
    if (!stageInfo?.id) return;

    supabase
      .from("stages")
      .update({ [field]: value })
      .eq("id", stageInfo.id)
      .then(({ error }) => {
        if (error) {
          console.error(`Error updating ${field}:`, error);
        } else {
          logger(`Production ${field} updated successfully`);
        }
      });
  };

  const updateAmbientCopresence = (value) => {
    if (!stageInfo?.id) return;

    supabase
      .from("stages")
      .update({
        ambient_copresence_active: value,
        emotes_active: value,
      })
      .eq("id", stageInfo.id)
      .then(({ error }) => {
        if (error) {
          console.error("Error updating ambient copresence:", error);
        } else {
          logger("Production ambient copresence updated successfully");
        }
      });
  };

  const deleteChatMessagesForStage = () => {
    supabase
      .from("chat_messages")
      .delete()
      .eq("stage_id", stageInfo.id)
      .then(({ error }) => {
        if (error) {
          console.error("Error deleting chat messages:", error);
        } else {
          logger("Chat messages deleted successfully");
        }
      });
  };

  return (
    <div className={styles.actionsPanel}>
      <div className={styles.actionsSwitches}>
        <div className={styles.actionsSwitchRow}>
          <Typography variant="body3">Chat</Typography>
          <ToggleSwitch
            isChecked={!!stageInfo?.chat_active}
            setIsChecked={(e) =>
              updateStageFlag("chat_active", e.target.checked)
            }
          />
        </div>

        <div className={styles.actionsSwitchRow}>
          <Typography variant="body3">Ambient Copresence & Emotes</Typography>
          <ToggleSwitch
            isChecked={!!stageInfo?.ambient_copresence_active}
            setIsChecked={(e) => updateAmbientCopresence(e.target.checked)}
          />
        </div>
      </div>

      <Button
        variant="primary"
        size="small"
        onClick={() => {
          var result = confirm("Are you sure?");
          if (result) {
            deleteChatMessagesForStage();
          }
        }}
      >
        Delete Chat Messages
      </Button>
    </div>
  );
};

export const FlexPanel = () => {
  const [currentPage, setCurrentPage] = useState("assets");

  return (
    <div className={styles.flexPanelContainer}>
      <div className={styles.tabsContainer}>
        <div
          className={`${styles.tab} ${
            currentPage === "assets" ? styles.active : ""
          }`}
        >
          <button onClick={() => setCurrentPage("assets")}>
            <Typography variant="body3">Assets</Typography>
          </button>
        </div>
        <div
          className={`${styles.tab} ${
            currentPage === "actions" ? styles.active : ""
          }`}
        >
          <button onClick={() => setCurrentPage("actions")}>
            <Typography variant="body3">Actions</Typography>
          </button>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {currentPage === "assets" && (
          <>
            <AssetMangementPanel />
          </>
        )}
        {currentPage === "actions" && (
          <>
            <ActionsPanel />
          </>
        )}
      </div>
    </div>
  );
};
