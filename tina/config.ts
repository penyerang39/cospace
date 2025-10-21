import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  branch,
  // No auth provider - auth is handled by backend
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "pricing",
        label: "Pricing",
        path: "content",
        format: "json",
        match: {
          include: "pricing.json",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/pricing",
        },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Feature Categories",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Category Name",
                required: true,
              },
              {
                type: "string",
                name: "slug",
                label: "Slug",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
            ],
          },
          {
            type: "object",
            name: "tiers",
            label: "Pricing Tiers",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Tier Name",
                required: true,
              },
              {
                type: "string",
                name: "slug",
                label: "Slug",
                required: true,
              },
              {
                type: "string",
                name: "pricing",
                label: "Pricing Display",
                description: "e.g., '$8/user/month' or 'Contact Sales'",
                required: true,
              },
              {
                type: "number",
                name: "pricePerUser",
                label: "Price Per User (number only)",
                description: "For sorting and display. Use 0 for free, -1 for custom/contact sales",
              },
              {
                type: "string",
                name: "userLimit",
                label: "User Limit",
                description: "e.g., 'Up to 5 users' or 'Unlimited'",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
              {
                type: "boolean",
                name: "isPopular",
                label: "Mark as Popular",
              },
              {
                type: "number",
                name: "order",
                label: "Display Order",
              },
            ],
          },
          {
            type: "object",
            name: "features",
            label: "Features",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Feature Name",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
              {
                type: "string",
                name: "category",
                label: "Category Slug",
                description: "Reference to category slug",
              },
              {
                type: "number",
                name: "order",
                label: "Display Order",
              },
              {
                type: "object",
                name: "tierStatus",
                label: "Tier Availability",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "tierSlug",
                    label: "Tier Slug",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "status",
                    label: "Status",
                    description: "1 = enabled, -1 = disabled",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
