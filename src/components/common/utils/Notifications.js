import { showNotification } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";
import { IconCheck, IconX } from "@tabler/icons";

// Show Success / Error Notifications
export const notifyOnSave = (identifier = "success") => {
  const chunk =
    identifier === "success"
      ? {
          title: "😎 It's done in no time!",
          msg: "Details have been saved successfully",
          icon: <IconCheck />,
          color: "lime",
        }
      : {
          title: "🤯 I am exhausted!",
          msg: "Some error has ocurred. Please try again in sometime.",
          icon: <IconX />,
          color: "red",
        };

  return showNotification({
    id: uuidv4(),
    title: chunk.title,
    message: chunk.msg,
    autoClose: 5000,
    icon: chunk.icon,
    color: chunk.color,
  });
};
