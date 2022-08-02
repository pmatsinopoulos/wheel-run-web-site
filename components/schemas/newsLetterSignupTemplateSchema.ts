import { TinaTemplate } from "tinacms";

const newsLetterSignupTemplateSchema: TinaTemplate = {
  name: "NewsletterSignup",
  label: "Newsletter Sign Up",
  fields: [
    {
      name: "children",
      label: "CTA",
      type: "rich-text",
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "string",
    },
    {
      name: "disclaimer",
      label: "Disclaimer",
      type: "rich-text",
    },
  ],
  ui: {
    defaultItem: {
      placeholder: "Enter your email",
      buttonText: "Notify Me",
    },
  },
};

export default newsLetterSignupTemplateSchema;
