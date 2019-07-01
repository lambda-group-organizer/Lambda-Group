import React from "react";
import CSVReader from "react-csv-reader";

const CSVreader = () => {
    const handleForce = data => {
        console.log(data);
    };

    return (
        <CSVReader
            cssClass="csv-reader-input"
            label="Select CSV with projects"
            onFileLoaded={handleForce}
            inputId="ObiWan"
            inputStyle={{ color: "red" }}

        />
    );
};

export default CSVreader;
