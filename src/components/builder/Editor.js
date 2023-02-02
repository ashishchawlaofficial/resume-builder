import { Tabs, Box } from "@mantine/core";
import Personal from "./personal/Personal";
import Education from "./education/Education";
import Employment from "./employment/Employment";
import Projects from "./projects/Projects";
import Certification from "./certification/Certification";
import Skills from "./skills/Skills";
import Misc from "./miscellaneous/Misc";
import {
  BsBook,
  BsPersonLinesFill,
  BsDiagram3Fill,
  BsUiChecks,
  BsTrophyFill,
  BsSnow,
  BsLightningFill,
} from "react-icons/bs";

//Tabs
const tabs = [
  { name: "Personal", id: "personal", icon: <BsPersonLinesFill size={16} /> },
  { name: "Education", id: "edu", icon: <BsBook size={16} /> },
  { name: "Employment", id: "emp", icon: <BsDiagram3Fill size={16} /> },
  { name: "Projects", id: "proj", icon: <BsUiChecks size={16} /> },
  {
    name: "Awards & Certifications",
    id: "certs",
    icon: <BsTrophyFill size={16} />,
  },
  { name: "Skills", id: "skill", icon: <BsLightningFill size={16} /> },
  { name: "Misc.", id: "misc", icon: <BsSnow size={16} /> },
];
// Tab Components
const tabComponents = [
  { component: <Personal />, id: "personal" },
  { component: <Education />, id: "edu" },
  { component: <Employment />, id: "emp" },
  { component: <Projects />, id: "proj" },
  { component: <Certification />, id: "certs" },
  { component: <Skills />, id: "skill" },
  { component: <Misc />, id: "misc" },
];

const Editor = () => {
  return (
    <Tabs
      color="dark"
      variant="pills"
      orientation="vertical"
      defaultValue="personal"
      radius="xl"
    >
      <Tabs.List
        sx={{
          width: "230px",
          borderRight: "1px solid #f5f5f5",
          padding: "20px 15px",
          height: "100vh",
        }}
      >
        {tabs.map((item, index) => {
          return (
            <Tabs.Tab key={index} value={item.id} icon={item?.icon}>
              {item.name}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Box sx={{ padding: "20px 0", width: "100%" }}>
        {tabComponents.map((item, index) => {
          return (
            <Tabs.Panel key={index} value={item.id} pl="xs">
              {item.component}
            </Tabs.Panel>
          );
        })}
      </Box>
    </Tabs>
  );
};

export default Editor;
