import React, { useState } from "react";
import type { TinaTemplate } from "tinacms";
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
  const [state, setState] = useState({
    UI: {
      sent: false,
      submitting: false,
      importantError: false,
    },
    form: {
      email: "",
      message: "",
    },
  });

  const formEmailChangeHandler = (event) =>
    setState({ ...state, form: { ...state.form, email: event.target.value } });

  const formMessageChangeHandler = (event) =>
    setState({
      ...state,
      form: { ...state.form, message: event.target.value },
    });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setState({
      ...state,
      UI: {
        ...state.UI,
        importantError: false,
        sent: false,
        submitting: true,
      },
    });

    (async () => {
      const url =
        process.env.NEXT_PUBLIC_CONTACT_US_POST_URL ||
        "http://localhost:3001/contact_us";
      const formData = {
        contact_us: { ...state.form },
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          cache: "no-cache",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          redirect: "follow",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.debug("Posted data successfully");
          setState({
            ...state,
            UI: { ...state.UI, sent: true, submitting: false },
          });
        } else {
          setState({
            ...state,
            UI: { ...state.UI, sent: false, submitting: false },
          });
          throw new Error("Network response was not OK");
        }
      } catch (e) {
        console.error(e);
        setState({
          ...state,
          UI: {
            ...state.UI,
            importantError: true,
          },
        });
      }
    })();
  };

  return (
    <div className="flex-1">
      <Container
        id={data.id}
        color={data.color}
        size="large"
        className="grid grid-cols-1 gap-x-10 gap-y-8 items-center justify-center"
      >
        {!state.UI.sent && (
          <form onSubmit={formSubmitHandler}>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mb-1 w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 rounded-md"
              placeholder={"Type in your email address"}
              value={state.form.email}
              onChange={formEmailChangeHandler}
            />
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="mb-1 w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 rounded-md"
              value={state.form.message}
              onChange={formMessageChangeHandler}
              placeholder="type in your message"
              required
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:mb-1">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={state.UI.submitting}
              >
                {state.UI.submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
        {state.UI.sent && <div>We received your message. Thank you!</div>}
        {state.UI.importantError && !state.UI.sent && (
          <div>Something went really bad! Do you have network connection?</div>
        )}
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
    },
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
