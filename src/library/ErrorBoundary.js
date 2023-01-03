import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error,info)
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error occurred!</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;