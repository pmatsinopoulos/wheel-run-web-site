import * as React from "react";
import type { TinaTemplate } from "tinacms";
import { Widget } from '@typeform/embed-react'
import { Container } from "../util/container";
import { useTheme } from "../layout";

export const ContactUs = ({ data, parentField }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <div className="flex-1">
      <Container id={data.id} color={data.color}
       size="large"
       className="grid grid-cols-1 gap-x-10 gap-y-8 items-center justify-center"
      >
        <Widget id="qFtu1QiE" style={{ width: "100%", height: "400px" }} className="my-form" />
      </Container>
    </div>
  );
};

export const contactUsBlockSchema: TinaTemplate = {
  name: "contactUs",
  label: "Contact Us",
  ui: {
    itemProps: (item) => {
      return {
        label: item?.sectionLabel,
      };
    }
  },
  fields: [
    {
      type: "string",
      label: "id",
      name: "id",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
