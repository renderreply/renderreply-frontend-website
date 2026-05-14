"use client";

import CookieConsent from "react-cookie-consent";

export function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Reject Non-Essential"
      enableDeclineButton
      style={{ background: "#1A1A2E" }}
      buttonStyle={{ background: "#E1306C", color: "#fff", borderRadius: "6px" }}
    >
      We use cookies to improve your experience. See our{" "}
      <a href="/privacy" style={{ color: "#E1306C", textDecoration: "underline" }}>Privacy Policy</a>.
    </CookieConsent>
  );
}
