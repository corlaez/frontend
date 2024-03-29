import { SettingsBackupRestoreOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function ConfirmEmail() {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expired, setExpired] = useState(null);
  const url = new URLSearchParams(window.location.search);
  const email = url.get("email");
  const token = url.get("token");
  const send = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/api/confirmation/resend", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        setMessage(json.message);
      }
      if (res.status === 201) setMessage("Sent");
    });
  };
  const confirm = (email, token) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // send the country code to the server where we will also detect the browser's preferred language located in the acceptsLanguages request header
    fetch("/api/confirmation/confirm", {
      method: "PATCH",
      body: JSON.stringify({ email, token }),
      headers,
    }).then(async (res) => {
      if (res.status >= 400 && res.status < 500) {
        const json = await res.json();
        if (res.status === 410) setExpired(true);
        setMessage(json.message);
      }
      if (res.status === 201) setSuccess(true);
    });
  };

  return (
    <div>
      {!expired ? (
        <>
          Confirm {email}:{" "}
          <button onClick={() => confirm(email, token)}>Confirm</button>
          {success ? <Redirect to={`/wishlist-setup`} /> : ""};
          {message && message}
        </>
      ) : (
        <>
          {" "}
          Resend confirmation to {email}: <button onClick={send}>Resend</button>
        </>
      )}
      {message && message}
    </div>
  );
}
