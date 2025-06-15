import React from "react";
import { AdaptiveImageDiv } from "../components/common/AdaptiveImageDiv";

export default function Test() {
  const imageUrl = "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&q=80";

  return <AdaptiveImageDiv sampleImageUrl={imageUrl} />;
}
