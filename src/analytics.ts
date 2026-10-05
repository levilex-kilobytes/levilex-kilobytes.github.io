import posthog from "posthog-js";

const isPostHogConfigured = Boolean(
  import.meta.env.VITE_POSTHOG_KEY?.trim() &&
    import.meta.env.VITE_POSTHOG_HOST?.trim(),
);

export const capturePortfolioEvent = (
  event: string,
  properties?: Record<string, string | number | boolean>,
) => {
  if (isPostHogConfigured) {
    posthog.capture(event, properties);
  }
};

export const capturePortfolioException = (
  error: unknown,
  componentStack: string | null,
) => {
  if (isPostHogConfigured) {
    posthog.captureException(error, { component_stack: componentStack });
  }
};
