import { TinaTemplate } from "tinacms";

const contactUsFormTemplateSchema: TinaTemplate = {
  name: "ContactUsForm",
  label: "Contact Us Form",
  fields: [
    {
      name: "namePlaceholder",
      label: "Name Placeholder",
      type: "string",
    },
    {
      name: "emailPlaceholder",
      label: "Email Placeholder",
      type: "string",
    },
    {
      name: "messagePlaceholder",
      label: "Message Placeholder",
      type: "string",
    },
    {
      name: "buttonPrompt",
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
      namePlaceholder: "Enter your name",
      emailPlaceholder: "Enter your email",
      messagePlaceholder: "Enter your message",
      buttonPrompt: "Send Message",
    },
  },
};

export default contactUsFormTemplateSchema;
