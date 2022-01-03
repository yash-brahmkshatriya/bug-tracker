import React from "react";
import { List, Divider } from "@material-ui/core";
import Information from "../Utils/Information";
import ThreadItem from "../Threads/ThreadItem";

const ThreadList = ({ threads, keepProjectNameHidden = false }) => {
  return threads?.length === 0 ? (
    <Information message="No items to show here...😕" />
  ) : (
    <List style={{ width: "100%" }}>
      {threads?.map((thread) => (
        <>
          <ThreadItem
            thread={thread}
            keepProjectNameHidden={keepProjectNameHidden}
          />
          <Divider />
        </>
      ))}
    </List>
  );
};
export default ThreadList;
