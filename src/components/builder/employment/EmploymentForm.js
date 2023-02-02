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
  getEmploymentData,
  saveEmploymentData,
} from "../../../store/slices/employmentSlice";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { employmentSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";
import { months, getYears } from "../../common/utils/Functions";

// Employment Form Component
const EmploymentForm = ({ setDrawer, requestUrlChunk }) => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.employment);

  // Years
  const years = getYears(1980).sort((a, b) => b - a);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      isPresent: false,
      company: "",
      designation: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      summary: "",
    },

    validate: yupResolver(employmentSchema),
  });

  const handleSubmit = (values) => {
    console.log("Employment Data: ", values);
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(saveEmploymentData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      dispatch(getEmploymentData(requestUrlChunk));
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
              label="Present Company"
              description="Check this box if this is your present company"
              color="dark"
              radius="xl"
              {...form.getInputProps("isPresent")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Company"
              placeholder="Name of the Company"
              classNames={classes}
              {...form.getInputProps("company")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Designation"
              placeholder="Current Designation"
              classNames={classes}
              {...form.getInputProps("designation")}
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
              placeholder="Roles & Responsibilities"
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

export default EmploymentForm;
