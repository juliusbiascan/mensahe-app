"use client";

import { useEffect } from "react";
import { usePageModal } from "@/hooks/usePageModal";

const SetupProfile = () => {
  const onOpen = usePageModal((state) => state.onOpen);
  const isOpen = usePageModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};
 
export default SetupProfile;
