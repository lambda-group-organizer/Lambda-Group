import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "semantic-ui-react";
import { Z_FIXED } from "zlib";

const CopyLink = props => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);
  }

  return (
    <>
      {document.queryCommandSupported("copy") && (
        <div>
          <button onClick={copyToClipboard}>
            {copySuccess ? "Copied!" : "Copy URL"}
          </button>
        </div>
      )}
      <form style={{ overflow: "hidden", position: "relative" }}>
        <textarea
          style={{
            position: "absolute",
            top: "-1000",
            left: "-1000"
          }}
          ref={textAreaRef}
          value={`http://localhost:3000/${props.buildWeek}`}
          readOnly
        />
      </form>
      {/* <Button onClick={copyLink}>Copy URL</Button>
            {copySuccess ? 'Copied!' : null}
            <textarea ref={textAreaRef} value={`http://localhost:3000/${props.buildWeek}`} readOnly style={{display: "none"}} /> */}
      {/* <textArea ref={textAreaRef value=`https://https://lambda-group-organizer.firebaseapp.com/${buildWeek}`}/> */}
    </>
  );
};

export default CopyLink;
