import React, { useState, useRef } from "react";
import { Card, Button } from "semantic-ui-react";
import { db } from "../../../logic/firebase.js";
//import { Z_FIXED } from "zlib";

const CopyLink = props => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);

  async function AddLinkToBuildWeek() {
    db.collection("build_weeks")
      .doc(`${props.buildWeek}`)
      .set(
        {
          studentUrl: `http://localhost:3000/${props.buildWeek}`
        },
        { merge: true }
      );
    try {
      const response = () => {
        console.log("Url Added to Firestore!", response);
      };
    } catch (err) {
      console.error(err);
    }
  }

  function copyToClipboard(e) {
    AddLinkToBuildWeek(e);
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
        <Card>
          <Button color="blue" onClick={copyToClipboard}>
            {copySuccess ? "Copied!" : "Copy URL"}
          </Button>
        </Card>
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
