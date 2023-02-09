import { Box, Grid, TextInput, Radio, Image } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useStyles } from "../../theme-config";
import TemplateImage from "../../assets/img/resume_template01.jpg";

const NewResumeLayout = () => {
  const { classes } = useStyles();
  // useForm hook to store the form field values
  const form = useForm({
    initialValues: {
      title: "",
      template: "",
    },

    // validate: yupResolver(personalInfoSchema),
  });

  return (
    <Box sx={{ padding: "50px" }}>
      <form className="newResumeForm">
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Resume Title"
              placeholder="e.g, My Resume"
              classNames={classes}
              {...form.getInputProps("title")}
            />
          </Grid.Col>

          <Grid.Col>
            <Radio.Group>
              <Grid>
                <Grid.Col span={4}>
                  <Radio
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 12,
                    }}
                    value="react"
                    label={
                      <Image
                        width="100%"
                        radius="10px"
                        src={TemplateImage}
                        alt="something"
                      />
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Radio
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 12,
                    }}
                    value="1"
                    label={
                      <Image
                        width="100%"
                        radius="10px"
                        src={TemplateImage}
                        alt="something"
                      />
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Radio
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 12,
                    }}
                    value="2"
                    label={
                      <Image
                        width="100%"
                        radius="10px"
                        src={TemplateImage}
                        alt="something"
                      />
                    }
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Radio
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 12,
                    }}
                    value="3"
                    label={
                      <Image
                        width="100%"
                        radius="10px"
                        src={TemplateImage}
                        alt="something"
                      />
                    }
                  />
                </Grid.Col>
              </Grid>
            </Radio.Group>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
};

export default NewResumeLayout;
