import { TinaTemplate } from "tinacms";

const gistCodeBlockTemplateSchema: TinaTemplate = {
  name: "GistCodeBlock",
  label: "Gist Code Block",
  fields: [
    {
      name: "gistId",
      label: "Gist Id",
      type: "string",
    },
    {
      name: "gistFile",
      label: "Gist File",
      type: "string",
    },
    {
      name: "caption",
      label: "Caption",
      type: "string",
    }
  ],
};

export default gistCodeBlockTemplateSchema;
