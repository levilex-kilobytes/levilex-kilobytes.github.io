import { Component, type ErrorInfo, type ReactNode } from "react";
import { capturePortfolioException } from "../analytics";

interface PostHogErrorBoundaryProps {
  children: ReactNode;
}

interface PostHogErrorBoundaryState {
  hasError: boolean;
}

class PostHogErrorBoundary extends Component<
  PostHogErrorBoundaryProps,
  PostHogErrorBoundaryState
> {
  state: PostHogErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PostHogErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    capturePortfolioException(error, errorInfo.componentStack ?? null);
    console.error("An unhandled application error occurred.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
            <p className="text-gray-500">
              Please refresh the page and try again.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default PostHogErrorBoundary;
