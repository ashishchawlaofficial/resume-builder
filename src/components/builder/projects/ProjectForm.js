import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  Box,
  Select,
  TextInput,
  Grid,
  Textarea,
  Button,
  Text,
  Checkbox,
} from "@mantine/core";
import { useStyles } from "../../../theme-config";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsData,
  saveProjectsData,
} from "../../../store/slices/projectsSlice";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { projectsSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";
import { months, getYears } from "../../common/utils/Functions";

// Project Form Component
const ProjectForm = ({ setDrawer, requestUrlChunk }) => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.projects);

  // Years
  const years = getYears(1980).sort((a, b) => b - a);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      isPresent: false,
      projectName: "",
      projectUrl: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      summary: "",
    },

    validate: yupResolver(projectsSchema),
  });

  const handleSubmit = (values) => {
    console.log("Projects Data: ", values);
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(saveProjectsData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      dispatch(getProjectsData(requestUrlChunk));
      setDrawer(false);
      form.reset();
      setIsSubmitted(false);
    }
  }, [error, loading, isSubmitted, setDrawer, dispatch, requestUrlChunk]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <Checkbox
              label="Ongoing Project"
              description="Check this box if this is your ongiong project"
              color="dark"
              radius="xl"
              {...form.getInputProps("isPresent")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Project Name"
              placeholder="Name of the Project"
              classNames={classes}
              {...form.getInputProps("projectName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Project Url"
              placeholder="URL of the website (if any)"
              classNames={classes}
              {...form.getInputProps("projectUrl")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Grid>
              <Grid.Col span={12} pb={0}>
                <Text fw={700} fz="sm">
                  Start Date
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      label="Month"
                      placeholder="Select Month"
                      classNames={classes}
                      data={months}
                      clearable
                      {...form.getInputProps("startMonth")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Year"
                      placeholder="Select Year"
                      classNames={classes}
                      data={years}
                      searchable
                      clearable
                      {...form.getInputProps("startYear")}
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={6}>
            {!form.values.isPresent && (
              <Grid>
                <Grid.Col span={12} pb={0}>
                  <Text fw={700} fz="sm">
                    End Date
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Grid>
                    <Grid.Col span={6}>
                      <Select
                        label="Month"
                        placeholder="Select Month"
                        classNames={classes}
                        data={months}
                        clearable
                        {...form.getInputProps("endMonth")}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        label="Year"
                        placeholder="Select Year"
                        classNames={classes}
                        data={years}
                        searchable
                        clearable
                        {...form.getInputProps("endYear")}
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            )}
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Summary"
              placeholder="Project Summary"
              autosize
              minRows={2}
              classNames={classes}
              {...form.getInputProps("summary")}
            />
          </Grid.Col>
        </Grid>
        <Button
          color="dark"
          mt={20}
          type="submit"
          leftIcon={<BsArrowRightCircleFill />}
          loading={loading === "pending"}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default ProjectForm;
