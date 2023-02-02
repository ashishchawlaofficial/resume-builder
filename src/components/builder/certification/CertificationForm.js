import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import {
  Box,
  Select,
  TextInput,
  Grid,
  Textarea,
  Button,
  Text,
  Radio,
} from "@mantine/core";
import { useStyles } from "../../../theme-config";
import { useDispatch, useSelector } from "react-redux";
import {
  getCertificationData,
  saveCertificationData,
} from "../../../store/slices/certificationSlice";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { certificationSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";
import { months, getYears } from "../../common/utils/Functions";

// Certification Form Component
const CertificationForm = ({ setDrawer, requestUrlChunk }) => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.certification);

  // Years
  const years = getYears(1980).sort((a, b) => b - a);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      type: "",
      title: "",
      authority: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      summary: "",
    },

    validate: yupResolver(certificationSchema),
  });

  const handleSubmit = (values) => {
    console.log("Certification Data: ", values);
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(saveCertificationData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      dispatch(getCertificationData(requestUrlChunk));
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
            <Radio.Group
              label="Is it an Award or Certification?"
              description="Choose from the below options"
              withAsterisk
              {...form.getInputProps("type")}
            >
              <Radio value="award" label="Award" />
              <Radio value="certification" label="Certification" />
            </Radio.Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label={`${upperFirst(form.values?.type)} Title`}
              placeholder="Enter the title"
              classNames={classes}
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Certifying Authority"
              placeholder="Company / Certifying authority"
              classNames={classes}
              {...form.getInputProps("authority")}
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

export default CertificationForm;
