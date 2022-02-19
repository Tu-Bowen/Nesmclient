import React from 'react'
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>当前网络状态不好，请检查您的网络</h1>;
      }
      return this.props.children;
    }
  }
  export default ErrorBoundary