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
} from "@mantine/core";
import { useStyles } from "../../../theme-config";
import { useDispatch, useSelector } from "react-redux";
import {
  getEducationData,
  saveEducationData,
} from "../../../store/slices/educationSlice";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { educationSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";
import { months, getYears } from "../../common/utils/Functions";

// Education Form Component
const EducationForm = ({ setDrawer, requestUrlChunk }) => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.education);

  // Years
  const years = getYears(1980).sort((a, b) => b - a);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      isPresent: "",
      institution: "",
      degree: "",
      areaOfStudy: "",
      grade: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      summary: "",
    },

    validate: yupResolver(educationSchema),
  });

  const handleSubmit = (values) => {
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(saveEducationData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      dispatch(getEducationData(requestUrlChunk));
      setDrawer(false);
      form.reset();
      setIsSubmitted(false);
    }
  }, [error, loading, isSubmitted, setDrawer, dispatch, requestUrlChunk]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Institution"
              placeholder="Name of College/School/Institue"
              classNames={classes}
              {...form.getInputProps("institution")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Degree"
              placeholder="Degree Name"
              classNames={classes}
              {...form.getInputProps("degree")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Area Of Study"
              placeholder="e.g, Maths Honours"
              classNames={classes}
              {...form.getInputProps("areaOfStudy")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Grade"
              placeholder="CGPA"
              classNames={classes}
              {...form.getInputProps("grade")}
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
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              label="Summary"
              placeholder="Details related to your education (if any)"
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

export default EducationForm;
