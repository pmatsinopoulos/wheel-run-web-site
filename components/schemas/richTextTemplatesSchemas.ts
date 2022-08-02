import { TinaTemplate } from "tinacms";
import blockQuoteTemplateSchema from "./blockQuoteTemplateSchema";
import contactUsFormTemplateSchema from "./contactUsFormTemplateSchema";
import dateTimeTemplateSchema from "./dateTimeTemplateSchema";
import newsLetterSignupTemplateSchema from "./newsLetterSignupTemplateSchema";

const richTextTemplatesSchemas: TinaTemplate[] = [
  contactUsFormTemplateSchema,
  dateTimeTemplateSchema,
  blockQuoteTemplateSchema,
  newsLetterSignupTemplateSchema,
]

export default richTextTemplatesSchemas;
