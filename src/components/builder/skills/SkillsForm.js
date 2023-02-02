import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { Box, TextInput, Grid, Button, ActionIcon } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useStyles } from "../../../theme-config";
import { useDispatch, useSelector } from "react-redux";
import {
  getSkillsData,
  saveSkillsData,
} from "../../../store/slices/skillsSlice";
import { BsArrowRightCircleFill, BsTrash } from "react-icons/bs";
import { skillsSchema } from "../../common/utils/YupSchemas";
import { notifyOnSave } from "../../common/utils/Notifications";

// Skills Form Component
const SkillsForm = ({ setDrawer, requestUrlChunk }) => {
  const { classes } = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.skills);

  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      skillTitle: "",
      skills: [{ name: "", rating: "", key: randomId() }],
    },

    validate: yupResolver(skillsSchema),
  });

  const handleSubmit = (values) => {
    console.log("Skills Data: ", values);
    const formData = {
      ...requestUrlChunk,
      formData: values,
    };
    dispatch(saveSkillsData(formData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (loading !== "pending" && error) {
      notifyOnSave("error");
    }
    if (isSubmitted && loading !== "pending" && !error) {
      notifyOnSave();
      dispatch(getSkillsData(requestUrlChunk));
      setDrawer(false);
      form.reset();
      setIsSubmitted(false);
    }
  }, [error, loading, isSubmitted, setDrawer, dispatch, requestUrlChunk]); // eslint-disable-line react-hooks/exhaustive-deps

  // Dynamic Skills
  const fields = form.values.skills.map((item, index) => (
    <Grid key={item.key}>
      <Grid.Col span={5}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Name of the Skill"
          classNames={classes}
          {...form.getInputProps(`skills.${index}.name`)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          withAsterisk
          label="Rating"
          placeholder="How would you rate for this skill? (out of 5)"
          classNames={classes}
          {...form.getInputProps(`skills.${index}.rating`)}
        />
      </Grid.Col>
      {index !== 0 && (
        <Grid.Col span={1}>
          <ActionIcon
            color="red"
            onClick={() => form.removeListItem("skills", index)}
            mt={12}
          >
            <BsTrash size={16} />
          </ActionIcon>
        </Grid.Col>
      )}
    </Grid>
  ));

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Heading"
              placeholder="Title of your Skills"
              classNames={classes}
              {...form.getInputProps("skillTitle")}
            />
          </Grid.Col>

          <Grid.Col>{fields}</Grid.Col>
          <Grid.Col>
            <Button
              variant="subtle"
              compact
              onClick={() =>
                form.insertListItem("skills", {
                  name: "",
                  rating: "",
                  key: randomId(),
                })
              }
            >
              + Add Skill
            </Button>
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

export default SkillsForm;
