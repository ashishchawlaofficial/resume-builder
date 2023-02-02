import { useEffect, useMemo, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { Box, Select, TextInput, Grid, Textarea, Button } from "@mantine/core";
import { useStyles } from "../../../theme-config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPersonalData,
  savePersonalData,
} from "../../../store/slices/personalInfoSlice";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { personalInfoSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";

const maritalData = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "unmarried", label: "Unmarried" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];
const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

// Personal Info Component
const PersonalForm = () => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { builderID, userID } = useParams();
  const { data, error, loading } = useSelector((state) => state.personal);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      title: "",
      email: "",
      name: "",
      contact: "",
      address: "",
      gender: "",
      maritalStatus: "",
      summary: "",
    },

    validate: yupResolver(personalInfoSchema),
  });

  const requestUrlChunk = useMemo(() => {
    return {
      builderId: builderID,
      userId: userID,
      endpointKey: "personalInfo",
      isFormData: true,
    };
  }, [builderID, userID]);

  const handleSubmit = (values) => {
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(savePersonalData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    dispatch(getPersonalData(requestUrlChunk));
  }, [dispatch, requestUrlChunk]);

  useEffect(() => {
    form.setValues(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      setIsSubmitted(false);
    }
  }, [error, loading, isSubmitted]);

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={5}>
            <TextInput
              label="Professional Title"
              placeholder="e.g, Frontend Developer"
              classNames={classes}
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={7}>
            <TextInput
              label="Name"
              placeholder="Full Name"
              classNames={classes}
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            <TextInput
              label="Email"
              placeholder="Email Address"
              classNames={classes}
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Contact"
              placeholder="Mobile Number"
              classNames={classes}
              {...form.getInputProps("contact")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Address"
              placeholder="Permanent Address"
              classNames={classes}
              {...form.getInputProps("address")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Gender"
              placeholder="Select Gender"
              classNames={classes}
              data={gender}
              {...form.getInputProps("gender")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Marital Status"
              placeholder="Select Status"
              classNames={classes}
              data={maritalData}
              {...form.getInputProps("maritalStatus")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Summary"
              placeholder="Professional Summary"
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

export default PersonalForm;
