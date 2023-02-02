import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Grid, Divider, TextInput, Button } from "@mantine/core";
import InputChips from "../../common/utils/inputChips/InputChips";
import { useStyles } from "../../../theme-config";
import {
  BsLinkedin,
  BsGithub,
  BsLink45Deg,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { useForm, yupResolver } from "@mantine/form";
import { miscSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";
import { getMiscData, saveMiscData } from "../../../store/slices/miscSlice";

const MiscForm = () => {
  const [languages, setLanguages] = useState([]);
  const [interests, setInterests] = useState([]);
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { builderID, userID } = useParams();
  const { data, error, loading } = useSelector((state) => state.misc);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      linkedin: "",
      github: "",
      portfolio: "",
    },

    validate: yupResolver(miscSchema),
  });

  const requestUrlChunk = useMemo(() => {
    return {
      builderId: builderID,
      userId: userID,
      endpointKey: "misc",
      isFormData: true,
    };
  }, [builderID, userID]);

  const handleSubmit = (values) => {
    // Check added to ensure that 'values' variable is not an event
    if (!values.type) {
      const miscData = {
        ...requestUrlChunk,
        formData: {
          ...values,
          languages,
          interests,
        },
      };
      dispatch(saveMiscData(miscData));
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    dispatch(getMiscData(requestUrlChunk));
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
      <Grid>
        <Grid.Col span={12}>
          <InputChips
            setCollection={setLanguages}
            placeholderText="Enter Languages"
            label="Preferred Languages"
            collection={data.languages}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <InputChips
            setCollection={setInterests}
            placeholderText="Enter Interests / Hobbies"
            label="Interests / Hobbies"
            collection={data.interests}
          />
        </Grid.Col>
      </Grid>
      <Box mt={20} mb={20}>
        <Divider
          my="xs"
          variant="dashed"
          labelPosition="center"
          label={<Box ml={5}>Let's get Social</Box>}
        />
      </Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Linkedin Url"
              label="Linkedin"
              classNames={classes}
              icon={<BsLinkedin size={14} />}
              {...form.getInputProps("linkedin")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              placeholder="Github Url"
              label="Github"
              classNames={classes}
              icon={<BsGithub size={14} />}
              {...form.getInputProps("github")}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            <TextInput
              placeholder="Portfolio Url"
              label="Personal Website"
              classNames={classes}
              icon={<BsLink45Deg size={14} />}
              {...form.getInputProps("portfolio")}
            />
          </Grid.Col>
        </Grid>
        <Button
          color="dark"
          mt={20}
          type="submit"
          leftIcon={<BsArrowRightCircleFill />}
          loading={loading === "pending"}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default MiscForm;
