"use client";

import { useState } from "react";
import { MainStage, MainStageControls } from "@/components/Stage";
import { RealtimeContextProvider } from "@/components/RealtimeContext";
import { useUserInteractionContext } from "@/components/UserInteractionContext";
import { AudienceOnboarding } from "@/components/AudienceOnboarding";
import { useStageContext } from "@/components/StageContext";

export const AudienceView = () => {
  const { stageInfo } = useStageContext();
  const [showAmbientCopresenceOverlay, setShowAmbientCopresenceOverlay] =
    useState(true);

  const overlayFeatureOn = !!stageInfo?.ambient_copresence_active;
  const effectiveShowOverlay =
    overlayFeatureOn && showAmbientCopresenceOverlay;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MainStage showAmbientCopresenceOverlay={effectiveShowOverlay} />
      <MainStageControls
        overlayFeatureOn={overlayFeatureOn}
        showAmbientCopresenceOverlay={showAmbientCopresenceOverlay}
        setShowAmbientCopresenceOverlay={setShowAmbientCopresenceOverlay}
      />
    </div>
  );
};

export default function Stage() {
  const { hasInteracted } = useUserInteractionContext();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const ready = hasInteracted && hasCompletedOnboarding;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!ready && (
        <AudienceOnboarding
          setHasCompletedOnboarding={setHasCompletedOnboarding}
        />
      )}
      {ready && (
        <RealtimeContextProvider>
          <AudienceView />
        </RealtimeContextProvider>
      )}
    </div>
  );
}
