import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-[#121A22] rounded-lg border border-[#FF2E2E] p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-[#FF2E2E] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#EAF6FF] mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
